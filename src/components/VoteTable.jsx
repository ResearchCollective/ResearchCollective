import React, { Component } from 'react';
import {Button, IconExternal, Box, DataView} from '@aragon/ui';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';
import ProfileHover from 'profile-hover';
import Loading from "./Loading";

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
                votes(first:20, where: { creator: "${this.props.creatorId}"}){
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
                    fields={this.props.columns}
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
        //TODO: Bug test to make sure the quorum check is working
        //TODO: Make the yea vs nay ratio reflect the DAO's voting threshold
        if ((item.yea > item.nay) && (item.yea + item.nay > item.minAcceptQuorum)) {
      //throw out the test votes
      if (!item.metadata.includes("test vote"))  {
           try {
                console.log("Trying to make JSON object for " + item.metadata);
                var metadata = JSON.parse(item.metadata);
                let composite = {
                    ...item,
                    ...metadata
                };
                if (!composite.hasOwnProperty("title")) {
                  composite.title = composite.description;
                  composite.description = "Additional details not provided; check link for more information."
                }
                processedData[processedData.length] = composite;
            } catch (e) {
              item.title = item.metadata;
              item.description = "Additional details not provided; check link for more information."
              item.owner = "N/A";
              item.url = "N/A";
              processedData[processedData.length] = item;
              }
            }
          }
        }
      }
    return processedData;
  }


export default Registry;
