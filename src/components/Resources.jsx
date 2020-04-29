import React, { Component } from 'react';
import { Button, Box, textStyle, SidePanel, Modal, Card, IconPlus, IconZoomIn } from '@aragon/ui';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';


class Resources extends Component {

  state = {
    registryData: []
  }

render() {
  const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/protofire/aragon'});
  client.query({
    query: gql`
    {
          votes(first: 2, orderBy: created, orderDirection: desc, where: {creator: "0xc6c1725868210736c3bcb784b4c13c6412823096"}){
          metadata
          id
          creator
          executed
          creator
          created
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
  console.log(this.state.registryData);
      return (
        <ApolloProvider client={client}>
          <div>
            <h1 className="sectionTitle"> Resources </h1>
             <Box style={{display: "inline"}}>
                {this.state.registryData &&  <div>
                <PostItemModal title="Post Listing"/>
                {this.state.registryData.map((item, key) =>
                  <RegistryCard id={item.id} metadata={item.metadata} executed={item.executed} created={item.created}/>
                )}
                </div>}
            </Box>
          </div>
        </ApolloProvider>
    );
  }
}



class RegistryCard extends Component {
  render() {
    return (
      <Card>
        <div height="300px!important">
            <p> {this.props.metadata} </p>
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
    <Button mode="positive"  icon={<IconPlus/>} onClick={open} label="Post Item"/>
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
      <Button mode="strong"  icon={<IconZoomIn/>} label="Examine" onClick={() => setSidePanelOpened(true)}/>

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
export default Resources;
