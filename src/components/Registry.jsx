import React, { Component } from 'react';
import { Button, Box, textStyle, SidePanel, Modal, Card, IconPlus, IconZoomIn } from '@aragon/ui';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';




class Registry extends Component {

  state = {
    registryData: []
  }

render() {
  const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/protofire/aragon'});
      return (
        <ApolloProvider client={client}>
          <div>
            <h1> Registry </h1>
             <Items client={client} />

             <Box>
                <RegistryCard description="Here is a brief summary of the item" title="Item Title"/>
                <PostItemModal title="Post Listing"/>
            </Box>
          </div>
        </ApolloProvider>
    );
  }
}

class Items extends Component {
  constructor(props) {
      super(props)
      this.state = {
          registryData: []
      };
  }

    render() {
        this.state.registryData =  this.props.client.query({
        query: gql`
        {

            votes(first: 5, where: { creator: "0xc6c1725868210736c3bcb784b4c13c6412823096"}){
              metadata
              id
              creator
              executed
              creator
              createdAtBlock
              createdAtTransaction
              supporters(first: 5) {
                voter
                stake
              }
              nonSupporters(first: 5) {
                voter
                stake
              }
            }
            supportVotes(first: 1) {
              voter
              stake
              voteId {
                id
              }
            }
          }

        `
      })
      .then(result => this.state.registryData = result.data.votes);
      return (
            <div>
            <p> Items </p>
              {this.state.registryData &&  (<> <div>
               <p>Data Loaded </p>
                  <Button  onClick={() => (console.log(this.state.registryData))}> data test button  </Button>
                  <p> vote id: {this.state.registryData.toString()} </p>
               </div>
               </>)
              }
            </div>
        )
    }
}


class RegistryCard extends Component {
  render() {
    return (
      <Card>
        <div height="300px!important">
        <h1> {this.props.id} </h1>
        </div>
        <ExamineItemSidePanel title="Examine Item"/>
      </Card>
    )
  }
}


function PostItemModal() {
  const [opened, setOpened] = React.useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  return (
  <>
    <Button mode="positive"  onClick={open}>Post Item <IconPlus/></Button>
    <Modal visible={opened} onClose={close}>
        <p> Post Item Content goes here </p>
    </Modal>
  </>
)
}


function ExamineItemSidePanel() {

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const postItem = () => alert('This is where the magic happens');

  const [sidePanelOpened, setSidePanelOpened] = React.useState(false);

  return (
    <>
      <Button mode="strong" onClick={() => setSidePanelOpened(true)}>
        Examine <IconZoomIn/>
      </Button>

      <SidePanel
        title="List Item"
        opened={sidePanelOpened}
        onClose={() => setSidePanelOpened(false)}
      >
        <h1> Side Panel Content for Examine Item </h1>
        <p> <i> Here we should see more information about the posting.
        </i> </p>
        <Button mode="strong" onClick={() => setSidePanelOpened(false)}>
          Request <IconZoomIn/>
        </Button>
      </SidePanel>
    </>
  );
}
export default Registry;
