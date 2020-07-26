import React, { Component } from 'react';
import {Button, IconExternal, DataView} from '@aragon/ui';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';
import ProfileHover from 'profile-hover';
import Loading from "./Loading";
import * as Constants from '../constants';

class Registry extends Component {
    state = {
        client: false,
        graphData: []
    };

  componentDidMount() {
     if (this.state.graphData === undefined  || this.state.graphData.length < 1) {
       this.loadData();
     }
 };

loadData() {
    var client = new ApolloClient({
          cache: new InMemoryCache(),
           uri: "https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-" + this.props.network});
           client.query({
            query: gql`
             {
                votes(first:20, where: { orgAddress: "${this.props.creatorId}"}){
                id
                creator
                metadata
                executed
                yea
                nay
                minAcceptQuorum
              }
             }
            `
      }).then(result =>  this.setState({graphData: processGraph(result.data.votes), client: client}))};



render() {
      return (
          <div>
             {this.state.graphData &&  <Loading data={this.state.graphData}/>}
             {this.state.graphData.length > 0 &&
                 <DataView  theme={'light'}
                    fields={Constants.COLUMNS_VOTES}
                    entries={this.state.graphData}
                    renderEntryExpansion={({description}) => {
                          return [<h1 style={{width: "100%"}}>{description}</h1>]
                    }}
                    renderEntry={({ title, poster, url}) => {
                        return [<h1 style={{width: "100%"}}>{title}</h1>,
                            <ProfileHover address={poster} showName={true}/>,
                            <div  className="buttonContainer txnButton"> <a rel="noopener noreferrer" target="_blank" href={url}> <Button label="" icon={<IconExternal/>}/> </a> </div>]
                     }
                   }
                />
            }
       </div>
    );
  }
}


function processGraph(data) {
  var processedData = [];
  if (typeof data[0] !== "undefined") {
    data.forEach(parseData);
    function parseData(item, index) {
        console.log("process Graph Loop @:  " + index);
        console.log(item);
        console.log("Yea Power: " + item.yea + " Nay Power: " + item.nay);
        //TODO: Add in check to see if the vote's duration has passed
        //TODO: Get minAcceptQuorum to work ... && (item.yea + item.nay > item.minAcceptQuorum)
        //TODO: Make the yea vs nay ratio reflect the DAO's voting threshold
        //Throw out test votes; make sure the vote passed; ignore votes w/o human readable metadata
        if (!item.metadata.includes("test vote") && (item.metadata.length > 0) && (item.yea > item.nay) ) {
         try {
                console.log("Trying to make JSON object for " + item.metadata);
                var metadata = JSON.parse(item.metadata);
                let composite = {
                    ...item,
                    ...metadata
                };
                //IF there is no title, we will use the description instead
                if (!composite.hasOwnProperty("title")) {
                  composite.title = composite.description;
                  composite.description = "Additional details not provided; check link for more information."
                }
                processedData[processedData.length] = composite;
            } catch (e) {
              //JSON format failed; let's fill in the blanks instead
              item.title = item.metadata;
              item.description = "Additional details not provided; check link for more information."
              item.owner = "N/A";
              item.url = "N/A";
              processedData[processedData.length] = item;
              }
            }
          }
        }
        console.log("Finished Data from VoteTable: ")
        console.log(processedData);
    return processedData;
  }

export default Registry;
