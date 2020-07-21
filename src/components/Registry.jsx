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
import { Connect, useApps, useOrganization, usePermissions } from '@aragon/connect-react'


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
                  renderEntryExpansion={({description}) => {
                    //TODO: Add in proper DID support here instead of URL
                    //    if (!did == null){
                    //      alert("did: " + did);
	                      return<Box  className="fullSize flexContainer"><ItemComment   box={this.props.box} address={this.props.address} did={description} /></Box>;
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
                  if (metadata.hasOwnProperty("title")) {
                      item.description = metadata.title;
                 } else if (metadata.hasOwnProperty("description")) {
                     item.description = metadata.description;
                 } else {
                    item.description = "Not Available";
                  }
                  console.log("made it past for: " + item.description);
                  if (metadata.hasOwnProperty("owner")) {
                     item.owner = metadata.owner;
                  } else {
                     item.owner = "0x262b4F07e42BBc33F597fcf0d854e9DAFaf3D469";
                  }
                 if (metadata.hasOwnProperty("url")) {
                   item.url = metadata.url;
                 } else {
                   item.url = "google.com";
                 }
                  for (index = 0; index < item.labels.length; index++) {
                      if (labels.includes(item.labels[index])) {
                        item.flags.visible = true;
                      }
                  }
                  if (!item.url.includes("http")) {
                      item.url = "https://" + item.url
                    }
                }
                item.did = "testdid";
                if (item.flags.visible && !item.description.includes("test vote")) {
                  item.flags.parsed = true;
                  console.log("added item:" + item.description);
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
              if ((item.description.length > 2) && !item.description.includes("test vote") && !item.description.includes("description")) {
               newData[newData.length] = item;
             }
            }
          }
        }
  return newData;
  }






  function ConnectTest() {
    const [org, orgStatus] = useOrganization()
    const [apps, appsStatus] = useApps()
    const [permissions, permissionsStatus] = usePermissions()

    const loading =
      orgStatus.loading || appsStatus.loading || permissionsStatus.loading
    const error = orgStatus.error || appsStatus.error || permissionsStatus.error

    if (loading) {
      return <p>Loading…</p>
    }

    if (error) {
      return <p>Error: {error.message}</p>
    }

    return (
      <>
      {org &&
        <h1>{org.name}</h1>
  }
        <h2>Apps</h2>
        <ul>

          {apps.map((app, i) => (
            <li key={i}>{app.name}</li>
          ))}

        {console.log(apps)};


        </ul>

        <h2>Permissions</h2>
        <ul>
          {permissions.map((permission, i) => (
            <li key={i}>{String(permission)}</li>
          ))}
        </ul>
      </>
    )
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
