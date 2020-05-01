import React, { Component } from 'react';
import { Button, Box, Modal, IconPlus, IconExternal, DataView } from '@aragon/ui';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import ProfileHover from 'profile-hover';
import Loading from "./Loading"

class Resources extends Component {

  constructor(props) {
      super(props);
       this.state = {
            client: false,
            graphData: []
       };
   }

 componentDidMount() {
     this.loadData();
 };


 loadData() {
   var client = new ApolloClient({
   uri: 'https://api.thegraph.com/subgraphs/name/protofire/aragon'});
   client.query({
     query: gql`
     {
           votes(where: { creator: "0x8f409307ecdd0cb567ae433a54ec9767ff585618"}){
           id
           creator
           metadata
           executed
           createdAtBlock
           createdAtTransaction
         }
       }
     `
   }).then(result =>  this.setState({graphData: result.data.votes, client: client}))}

render() {
      return (
          <div>
            <h1 className="sectionTitle pushUp"> Resources </h1>
            <p className="sectionSubTitle pushUp"> passed by the expert DAO <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/covidresearch">'Covid Research' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a>   </p>
             <Box style={{display: "inline"}}>
             {this.state.graphData &&  <Loading data={this.state.graphData}/>}
             {this.state.graphData.length > 0 &&
               <DataView
                  fields={['Description', 'Poster', 'Link']}
                  entries={ExtricateData(this.state.graphData)}
                  renderEntry={({ description, owner, url, parsed }) => {
                    if (parsed) {
                      return [<h1 style={{width: "100%"}}>{description}</h1>,  <ProfileHover address={owner} showName={true}/>, <div  className="buttonContainer txnButton"> <a rel="noopener noreferrer" target="_blank" href={url}><Button label="" icon={<IconExternal/>}/> </a> </div>]
                    } else {
                      return [<h1 style={{width: "100%"}}>{description}</h1>]
                    }
                  }}
                />
              }
              <PostItemModal/>
            </Box>
          </div>
    );
  }
}


function ExtricateData(data) {
  var newData = [];
  var newDataIndex = 0;
  if (typeof data[0] !== "undefined") {
    data.forEach(myFunction);
    function myFunction(item, index) {
        console.log("Extricate Loop @:  " + index + item);
           try {
                console.log("Trying to make  JSON object for " + item.metadata);
                var metadata = JSON.parse(item.metadata);
                console.log("Made initial JSON object for " + index);
                item.description = metadata.description;
                item.owner = metadata.owner;
                item.url = metadata.url;
                item.staked = metadata.staked;
                item.parsed = true;
                  if (!item.url.includes("http")) {
                    item.url = "https://" + item.url
                  }
                if (!item.description.includes("test vote")) {
                  newData[newDataIndex] = item;
                  newDataIndex++;
                }
            } catch (e) {
              item.description = item.metadata;
              item.owner = "N/A";
              item.url = "N/A";
              item.staked = "N/A";
              item.parsed = false;
              console.log("Vote item " + index + " failed; resulting object:");
              console.log(item);
            }
          }
        }
  console.log("old data at end of Extricate: " +  data);
  console.log("new data at end of Extricate: " + newData);
  return newData;
  }

function PostItemModal() {
  const [opened, setOpened] = React.useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  return (
    <>
      <Button className="pushDown" mode="neutral"  icon={<IconPlus/>} onClick={open} label="Post Item"/>
      <Modal visible={opened} onClose={close}>
          <p> Post to list function will be completed in the next hackathon.</p>
          <p> Anyone can stake Ether behind a listing.</p>
          <p> It will generate an Aragon vote to be voted upon by the relevant sub DAO.</p>
          <p>If listed, it will convert the ETH into interest bearing DAI.</p>
          <p>That interest could be used to fund research projects for disputed topics.</p>
          <p> Eventually, each listing will be subjected to dispute via Kleros.</p>
          <p>If a contestant wins the challenge, the listing is removed, <br/> and they receive the poster's staked Ether or DAI.</p>
      </Modal>
    </>
  )
}

export default Resources;
