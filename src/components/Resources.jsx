import React, { Component } from 'react';
import {Button, Box, Modal, IconPlus, IconExternal} from '@aragon/ui';
import Registry from './Registry';
import { Form } from "react-bootstrap";

class Resources extends Component {
    //ID for covidresearch DAO's voting smart contract is specified below
    state = {
        box:false,
        address:false,
        voteId: "0x8f409307ecdd0cb567ae433a54ec9767ff585618",
        columns: ['Description', 'Poster', 'Link']
    };


render() {
      return (
          <div>
            <h1 className="sectionTitle"> Resources </h1>
            <p className="sectionSubTitle"> passed by the expert DAO <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/covidresearch">'Covid Research' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a>   </p>
             <Box style={{display: "inline"}}>
               <Registry box={this.props.box} voteId={this.state.voteId} columns={this.state.columns} address={this.props.address}/>
            </Box>
            <PostItemModal/>
          </div>
    );
  }
}


class PostForm extends Component {

  constructor() {
       super();
       this.state = {
         title: '',
         description: '',
         address: '',
         posterEthAddress: '',
         consent: false,
         vendor: false,
         antiviral: false,
         testkit: false,
         registry: false,
         article: false,
       };
     }

  handleFormChange= (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */

        this.setState({ [e.target.name]: e.target.value });

  }

  handleMultiFormChange = (e) => {
    if (this.state.labels.includes(e.target.value)) {
      console.log("about to remove: " + e.target.value + " from " + this.state.labels);
      var array = this.state.labels; // make a separate copy of the array
      var index = array.indexOf(e.target.value)
      if (index !== -1) {
        array.splice(array, 1);
        this.setState({labels: array});
      }
    } else {
    this.setState({
      labels: this.state.labels.concat([e.target.value])
    })
  }
}

    render() {
      const mySubmitHandler = event => {

      var labels = [];
      var listing = {};
      listing.title = this.state.title;
      listing.description = this.state.description;
      listing.address = this.state.address;
      listing.version = "RC0.1";
      listing.submitterId = this.state.posterEthAddress;
      //there must be some better way to collect the labels ... this is a temporary hack
      if (this.state.vendor) {
        labels.push("vendor")
      }
      if (this.state.antiviral) {
        labels.push("antiviral")
      }
      if (this.state.testkit) {
        labels.push("testkit")
      }
      if (this.state.article) {
        labels.push("article")
      }
      if (this.state.registry) {
        labels.push("registry")
      }
      listing.labels = labels;
      var json = JSON.stringify(listing);
      console.log("JSON object from posting:");
      console.log(json);
    //TODO Make this go to the Telegram bot!
    }
      return (
            <Box>
            <Form onSubmit={mySubmitHandler}>

              <Form.Group onChange={this.handleFormChange} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control    name="title" onChange={this.handleFormChange} />
              <Form.Text  className="text-muted">
               What text should be displayed as this listing's title?
              </Form.Text>
              </Form.Group>

              <Form.Group  controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description"  onChange={this.handleFormChange}  as="textarea" rows="3" />
              <Form.Text className="text-muted">
               Describe the subject of the listing
              </Form.Text>
              </Form.Group>

              <Form.Group  controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control  onChange={this.handleFormChange}  name="address"/>
              <Form.Text className="text-muted">
               URL, DOI, Physical Address or Contact Method
              </Form.Text>
              </Form.Group>

              <Form.Group controlId="ethAddress">
              <Form.Label>Ethereum Address</Form.Label>
              <Form.Control  onChange={this.handleFormChange}  name="posterEthAddress" />
              <Form.Text className="text-muted">
               Optional; will eventually be able to update listing
              </Form.Text>
              </Form.Group>

              <Form.Group controlId="tags">
              <Form.Label>Optional Tags</Form.Label>
              <Form.Check  onChange={this.handleFormChange}  label="Covid" name="vendor" />
              <Form.Check onChange={this.handleFormChange}   label="Anti-Viral" name="antiviral" />
              <Form.Check  onChange={this.handleFormChange}  label="Test Kit" name="testkit" />
              <Form.Check onChange={this.handleFormChange}    label="Registry" name="registry" />
              <Form.Check  onChange={this.handleFormChange}  label="Article" name="article" />
              </Form.Group>

              <Form.Group name="consent" controlId="consent">
              <Form.Check   onChange={this.handleFormChange} type="checkbox" label="I acknowledge that this data will be stored on a public ledger." />
              </Form.Group>



            <Button variant="primary" type="submit">
                Submit
            </Button>
           </Form>
         </Box>
       );
     }
  }




function PostItemModal() {
  const [opened, setOpened] = React.useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)


  return (
    <>
      <Button className="pushDown" mode="outline"  icon={<IconPlus/>} onClick={open} label="Post Resource"/>
        <Modal visible={opened} onClose={close}>
             <Box className="notesContainer">
               <h1 className="sectionTitle"> List Resource</h1>
                  <PostForm/>
               </Box>
      </Modal>
    </>
  )
}



export default Resources;
