import React, { Component } from 'react';
import {Button, Container, Row, Card} from 'react-bootstrap';
import Credentials from './Credentials';
import Web3Container from './Web3Container';
import ProfileHover from 'profile-hover';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
         <Container>
            <h3> Profile </h3>
            <p>MetaMask connected as {this.accounts}</p>
            <Web3Container address={this.address} accounts={this.accounts} web3enabled={this.web3enabled}>
              <ProfileHover address={'0x262b4F07e42BBc33F597fcf0d854e9DAFaf3D469'} showName={true} />
                <p> Profile Sample Text </p>
             <Credentials/>
            </Web3Container>
        </Container>
    );
  }
}

export default Profile;
