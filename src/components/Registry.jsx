import React, { Component } from 'react';
import {Button, IconExternal, Box, DataView} from '@aragon/ui';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';
import ProfileHover from 'profile-hover';
import Loading from "./Loading";
import ThreeBoxComments from '3box-comments-react';
import Voting from '@aragon/connect';
import connect from '@aragon/connect';

class Registry extends Component {
    commentData = {};
    state = {
        client: false,
        graphData: [],
        visibleGraphData: [],
        box:false,
        address:false,
          voteId: "0x0f5c3fef568487b9937c57d93ca8f7c7e556375e",
      //  voteId: "0x8f409307ecdd0cb567ae433a54ec9767ff585618",
        labels: ["entity", "event"]
    };

    connectAragon = async () => {
          const org = await connect('covidresearch.aragonid.eth', 'thegraph');
          console.log("org:");
          console.log(org);
          const voting = new Voting(
              await org.app('voting').address,
              'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet'
          );
          console.log("voting:");
          console.log(voting);
          const votes = await voting.votes();
          console.log("votes:");
          console.log(votes);
      }


  componentDidMount() {
     this.setState({
         box:this.props.box,
         address: this.props.adress
     });
     if (this.state.graphData === undefined  || this.state.graphData.length < 1) {
       this.loadData();
     }
 };

 toggleLabel(e) {
    if (this.state.graphData === undefined  || this.state.graphData.length < 1) {
      this.loadData();
      console.log("Graph data:");
      console.log(this.state.graphData);
    }
  };



  loadData() {
  //  var subgraph = "https://api.thegraph.com/subgraphs/name/ajsantander/aragon-voting-rinkeby";
    var client = new ApolloClient({
          cache: new InMemoryCache(),
           uri: "https://api.thegraph.com/subgraphs/name/ajsantander/aragon-voting-mainnet"});
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
        }).then(result =>  this.setState({graphData: result.data.votes, client: client}))};



render() {

      return (
          <div>
             {this.state.graphData &&  <Loading data={this.state.graphData}/>}
             {this.state.graphData.length > 0 &&
                //
                 //first try to get this function firing only when clicking...
                 // if you set an alert or console.log it will be clear how often it is firing
                 //after that, allow these buttons to toggle the filters
                 // Button onClick=this.toggleLabel("covid")
                 <DataView  theme={'light'}
                    fields={this.props.columns}
                    // entries is a list of items
                    entries={processGraph(this.state.labels, this.state.graphData)}
                    renderEntryExpansion={({description}) => {
                          return [<h1 style={{width: "100%"}}>{description}</h1>]
                    }}
                    renderEntry={({ title, owner, url}) => {
                        return [<h1 style={{width: "100%"}}>{title}</h1>,
                            <ProfileHover address={owner} showName={true}/>,
                            <div  className="buttonContainer txnButton"> <a rel="noopener noreferrer" target="_blank" href={url}> <Button label="" icon={<IconExternal/>}/> </a> </div>]
                     }
                   }
                />
            }
       </div>
    );
  }
}



function processGraph(labels, data) {
  var processedData = [];
  if (typeof data[0] !== "undefined") {
    data.forEach(parseData);
    function parseData(item, index) {
        console.log("process Graph Loop @:  " + index);
        console.log(item);
        console.log("Yea Power: " + item.yea + " Nay Power: " + item.nay);
      //  if (item.yea > item.nay) {
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
              item.description = item.metadata;
              item.owner = "N/A";
              item.url = "N/A";
              item.staked = "N/A";
              item.title="N/A";
              if (!item.createdAtTransaction == null) {
                item.url = "https://etherscan.io/tx/" + item.createdAtTransaction;
              }
              item.parsed = false;
              item.flags = {parsed: false, visible: true};
              console.log("Vote item " + index + " failed; resulting object:");
             console.log(item);
              if ((item.description.length > 2) && !item.description.includes("test vote") && !item.description.includes("description")) {
               processedData[processedData.length] = item;
             }
            }
          }
        }
      }
  return processedData;
  }


  class ItemComment extends Component {
    render() {
      return (<>

          {this.props.box && this.props.address &&
            <ThreeBoxComments
                // required
                spaceName="researchCollective"
                threadName={this.props.did}
                adminEthAddr={this.props.address}

                // Required props for context A) & B)
                box={this.props.box}
                currentUserAddr={this.props.address}
            />
      }
      </>
    )
  }
}
export default Registry;
