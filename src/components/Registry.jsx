import React, { Component } from 'react';
import {Button, Container, Modal} from 'react-bootstrap';

class Registry extends Component {
  
  render() {
      return (
         <Container>
            <h3> Registry</h3>
            <PostItemModal title="Post Listing"/>

        </Container>
    );
  }
}

function PostItemModal() {

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const postItem = () => alert('This is where the magic happens');


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        List Item in Registry
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>We will put some form items here later to pass information!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postItem}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Registry;
