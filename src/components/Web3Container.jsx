import React, { Component } from 'react';
import {Container} from 'react-bootstrap';

class Web3Container extends Component {

    render() {
      if (this.web3enabled || !this.web3enabled) {
        return (
           <Container>
               {this.props.children}
           </Container>
      ) } else {
        return (
          <h5><i> Install the MetaMask browser extension to enjoy the decentralized future.</i></h5>
        )
      }
    }
  }

export default Web3Container;
