import React, { Component } from 'react';
import {Button, IconExternal, Box, DataView} from '@aragon/ui';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';
import ProfileHover from 'profile-hover';
import Loading from "./Loading";
import ThreeBoxComments from '3box-comments-react';

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



    componentDidMount() {
      //These are fake comments used by Ian earlier... we probably should delete this after the DAIA hackathon
    //    this.commentData["0x648e7a1a51db72fc2df3091614e79468feabff40-4"] = ["aitheric - Used their test kit with consistent results.",
      //      "Alfonso II - Arrived on time with good documentation.",
    //        <Button className="pushDown" mode="neutral"  icon={<IconPlus/>} label="Add Comment" style={{marginBottom:40}}/>
    //    ];
  //      this.commentData["0x648e7a1a51db72fc2df3091614e79468feabff40-5"] = ["JasonLTV - Now I can vape happily ever after.",
  //          "DangerXXX - Not sure this makes sense to start smoking again just with one study so far.",
    //        <Button className="pushDown" mode="neutral"  icon={<IconPlus/>} label="Add Comment" style={{marginBottom:40}}/>
  //      ];
     this.setState({
         box:this.props.box,
         address: this.props.adress
     });
     if (this.state.graphData === undefined  || this.state.graphData.length < 1) {
       this.loadData();
     }
 };

 toggleLabel(e) {

   var array  = [];
    this.state.labels = array;
    if (this.state.graphData === undefined  || this.state.graphData.length < 1) {
      this.loadData();
      console.log("Graph data:");
      console.log(this.state.graphData);
    }
  };



 loadData() {
   var client = new ApolloClient({
         cache: new InMemoryCache(),
         uri: 'https://api.thegraph.com/subgraphs/name/protofire/aragon'});
   client.query({
     query: gql`
      {
           votes(first:20, where: { creator: "${this.props.voteId}"}){
           id
           creator
           metadata
           executed
           createdAtBlock
           createdAtTransaction
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
                  renderEntryExpansion={({url}) => {
                    //TODO: Add in proper DID support here instead of URL
                    //    if (!did == null){
                    //      alert("did: " + did);
	                      return<Box  className="fullSize flexContainer"><ItemComment   box={this.props.box} address={this.props.address} did={url} /></Box>;
                  //    }
                    }
                  }
                  renderEntry={({ description, owner, url, labels, flags}) => {
                    if (flags.parsed && flags.visible ) {
                      return [<h1 style={{width: "100%"}}>{description}</h1>,
                          <ProfileHover address={owner} showName={true}/>,
                          <div  className="buttonContainer txnButton"> <a rel="noopener noreferrer" target="_blank" href={url}> <Button label="" icon={<IconExternal/>}/> </a> </div>]
                    } else if (flags.visible) {
                      return [<h1 style={{width: "100%"}}>{description}</h1>,   <div  className="buttonContainer txnButton"> <a rel="noopener noreferrer" target="_blank" href={url}> <Button label="" icon={<IconExternal/>}/> </a> </div>]
                    }
                   }
                 }
              />
            }
       </div>
    );
  }
}



function processGraph(labels, data) {
  var newData = [];
  if (typeof data[0] !== "undefined") {
    data.forEach(parseData);
    function parseData(item, index) {
        console.log("process Graph Loop @:  " + index + item);
           try {
                console.log("Trying to make  JSON object for " + item.metadata);
                var metadata = JSON.parse(item.metadata);
                item.flags = {parsed: false, visible: true};
                item.labels = ["entity", "event"];
                if (metadata.ipfs === null) {
                  //pull what we can from IPFS  // RC.02
                  console.log("Found IPFS / RC.02 JSON format for index " + index);
                  item.owner = "0x262b4F07e42BBc33F597fcf0d854e9DAFaf3D469";
                  item.description = "Foo Bar Description";
                  item.url = "https://test.com";
                  item.did = "testdid";
                } else {
                  //RC.01 JSON format
                  console.log("Found RC.01 JSON format for index " + index);
                 if (metadata.title == null) {
                    item.description = metadata.description;
                } else {
                  item.description = metadata.title;
                  item.tooltip = metadata.description;
                }
                  item.owner = metadata.owner;
                  item.url = metadata.url;
                  item.did = "testDID";
                  //item.did =  metadata.url.split("//");
                  //item.staked = metadata.staked;
                  for (index = 0; index < item.labels.length; index++) {
                      if (labels.includes(item.labels[index])) {
                        item.flags.visible = true;
                      }
                  }
                  if (!item.url.includes("http")) {
                      item.url = "https://" + item.url
                    }
                }

                if (item.flags.visible && !item.description.includes("test vote")) {
                item.flags.parsed = true;
                  newData[newData.length] = item;
                }
            } catch (e) {
              item.description = item.metadata;
              item.owner = "N/A";
              item.url = "N/A";
              item.staked = "N/A";
              if (!item.createdAtTransaction == null) {
                item.url = "https://etherscan.io/tx/" + item.createdAtTransaction;
              }
              item.parsed = false;
              item.flags = {parsed: false, visible: true};
              console.log("Vote item " + index + " failed; resulting object:");
             console.log(item);
              if ((item.description.length > 2) && !item.description.includes("test vote")&& !item.description.includes("description")) {
               newData[newData.length] = item;
             }
            }
          }
        }
  return newData;
  }



  class ItemComment extends Component {
    render() {
      return (<>

          {this.props.box && this.props.address &&
            <ThreeBoxComments
                // required
                spaceName="researchCollective"
                threadName={this.props.did[1]}
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
