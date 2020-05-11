import React, { Component } from 'react';
import { Button, Box, Modal, IconPlus, IconExternal, DataView, Field, TextInput } from '@aragon/ui';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import ProfileHover from 'profile-hover';
import Loading from "./Loading";
import ThreeBoxComments from '3box-comments-react';

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
                  fields={['Description', 'Poster', 'Comments', 'Link']}
                  entries={ExtricateData(this.state.graphData)}
                  renderEntry={({ description, owner, url, parsed }) => {
                    if (parsed) {
                      return [<h1 style={{width: "100%"}}>{description}</h1>,  <ProfileHover address={owner} showName={true}/>, <CommentModal box={this.props.box} address={this.props.address}/>, <div  className="buttonContainer txnButton"> <a rel="noopener noreferrer" target="_blank" href={url}><Button label="" icon={<IconExternal/>}/> </a> </div>]
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

function CommentModal(box, address){
  const [opened, setOpened] = React.useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  return (
      <div>
        <Button  mode="neutral"  icon={<IconPlus/>} onClick={open} label="Comments"/>
          <Modal visible={opened} onClose={close}>
            {box && address &&
             <Box className="notesContainer">
                <h1> this is where the comments go </h1>
             </Box>}
          </Modal>
      </div>
  )
}

function PostItemModal() {
  const [opened, setOpened] = React.useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  return (
    <>
      <Button className="pushDown" mode="neutral"  icon={<IconPlus/>} onClick={open} label="Post Resource"/>
        <Modal visible={opened} onClose={close}>
             <Box className="notesContainer">
               <h1 className="sectionTitle pushUp"> Post Resource</h1>
               <p className="sectionSubTitle pushUp">on Covid Research</p>
             <Field label="Name"><TextInput placeholder="Required" wide="true"></TextInput></Field>
             <Field label="URL"><TextInput placeholder="Optional" wide="true"></TextInput></Field>
             <Field  label="Description"><TextInput placeholder="Required" wide="true" multiline="true"></TextInput></Field>
             <Button mode="strong" label="Post"/>
          </Box>
      </Modal>
    </>
  )
}

export default Resources;
