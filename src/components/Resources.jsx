import React, { Component } from 'react';
import {Button, Box, Modal, DropDown, IconPlus, IconExternal, DataView, Field, TextInput} from '@aragon/ui';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import ProfileHover from 'profile-hover';
import Loading from "./Loading";
import ThreeBoxComments from '3box-comments-react';

class Resources extends Component {
    commentData = {};
    state = {
        client: false,
        graphData: [],
        visibleGraphData: [],
        box:false,
        address:false,
        labels: ["entity", "event"]
    };


  static getDerivedStateFromProps(props,state){
        console.log(props);
    }

    componentDidMount() {
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
         space: this.props.space,
         address: this.props.adress
     });
     if (this.state.graphData.length === undefined  || this.state.graphData.length < 1) {
       this.loadData();
     }
 };

 toggleLabel(label) {
    //  var newLabels = [];
    //  this.state.labels = newLabels;
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
   }).then(result =>  this.setState({graphData: result.data.votes, client: client}))};

render() {

      return (
          <div>
            <h1 className="sectionTitle"> Resources </h1>
            <p className="sectionSubTitle"> passed by the expert DAO <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/covidresearch">'Covid Research' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a>   </p>
            <Button onClick={this.toggleLabel("entity", this.state.labels)} label="Entities"/>
            <Button onClick={this.toggleLabel("event", this.state.labels)} label="Events"/>
             <Box style={{display: "inline"}}>
             {this.state.graphData &&  <Loading data={this.state.graphData}/>}
             {this.state.graphData.length > 0 &&

               <DataView  theme={'light'}
                  fields={['Description', 'Poster', 'Link']}
                  // entries is a list of items
                  entries={processGraph(this.state.labels, this.state.graphData)}
                  renderEntryExpansion={({did}) => {
	                      return <ItemComment   box={this.props.box} address={this.props.address} did={did} />;
                  }
                  }
                  renderEntry={({ description, owner, url, labels, flags}) => {
                    if (flags.parsed && flags.visible ) {
                      return [<h1 style={{width: "100%"}}>{description}</h1>,
                          <ProfileHover address={owner} showName={true}/>,
                          <div  className="buttonContainer txnButton"> <a rel="noopener noreferrer" target="_blank" href={url}> <Button label="" icon={<IconExternal/>}/> </a> </div>]
                    } else if (flags.visible) {
                      return [<h1 style={{width: "100%"}}>{description}</h1>]
                    }
                   }
                 }
                />
              }
              <PostItemModal/>
            </Box>
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
                console.log("Made initial JSON object for " + index);
                item.description = metadata.description;
                item.owner = metadata.owner;
                item.url = metadata.url;
                item.did =  metadata.url.split("//");
                item.staked = metadata.staked;
                item.flags = {parsed: false, visible: false};
                item.labels = ["entity", "event"];
                for (index = 0; index < item.labels.length; index++) {
                    if (labels.includes(item.labels[index])) {
                      item.flags.visible = true;
                    }
                }
                if (!item.url.includes("http")) {
                    item.url = "https://" + item.url
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
              item.parsed = false;
              item.flags = {parsed: false, visible:true};
              console.log("Vote item " + index + " failed; resulting object:");
              console.log(item);
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


function PostItemModal() {
  const [opened, setOpened] = React.useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const [selected, setSelected] = React.useState()
  return (
    <>
      <Button className="pushDown" mode="outline"  icon={<IconPlus/>} onClick={open} label="Post Resource"/>
        <Modal visible={opened} onClose={close}>
             <Box className="notesContainer">
               <h1 className="sectionTitle"> Post Resource</h1>
               <Field label="Type">
                 <DropDown
                    items={['Vendor', 'Article', 'Registry', 'Experiment']}
                    selected={selected}
                    onChange={setSelected}
                  />
                </Field>
             <Field label="Name"><TextInput placeholder="Required" wide="true"></TextInput></Field>
             <Field  label="Description"><TextInput placeholder="Required" wide="true" multiline="true"></TextInput></Field>
             <Field label="URL or DOI"><TextInput placeholder="Optional" wide="true"></TextInput></Field>
             <Field label="Owner"><TextInput placeholder="EthAddress or Email; Optional" wide="true"></TextInput></Field>
             <Button mode="strong" label="Post"/>
          </Box>
      </Modal>
    </>
  )
}

export default Resources;
