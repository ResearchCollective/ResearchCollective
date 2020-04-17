import React, { Component } from 'react';
import {Button, Container, Row, Card} from 'react-bootstrap';
import Credentials from './Credentials';
import Web3Container from './Web3Container';

class Registry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
         <Container>
            <h3> Registry</h3>
        </Container>
    );
  }
}

export default Registry;
