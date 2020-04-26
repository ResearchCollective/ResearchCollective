import React, { Component } from 'react';
import { Button, Box, textStyle, SidePanel, Modal, Card, IconPlus, IconZoomIn } from '@aragon/ui';

class Registry extends Component {

  render() {
      return (
        <div>
          <h1> Registry </h1>
           <Box>
              <RegistryCard description="Here is a brief summary of the item" title="Item Title"/>
              <PostItemModal title="Post Listing"/>
          </Box>
        </div>
    );
  }
}

class RegistryCard extends Component {
  render() {
    return (
      <Card>
        <h1> {this.props.title} </h1>
        <div height="300px!important">
            {this.props.description}
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
