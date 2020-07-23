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
        labels: ["entity", "event"]
    };



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
         uri: 'https://api.thegraph.com/subgraphs/name/ajsantander/aragon-voting-rinkeby'});
   client.query({
     query: gql`
      {
           votes(first:20, where: { creator: "${this.props.voteId}"}){
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


  // }).then(result =>  this.setState({graphData: result.data.votes, client: client}))};


render() {
      return (
          <div>
             {this.state.graphData &&  <Loading data={this.state.graphData}/>}
             {this.state.graphData.length > 0 &&
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
            <li key={i}>{app.name + " lol hey " + app.address}</li>
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



export default Registry;
