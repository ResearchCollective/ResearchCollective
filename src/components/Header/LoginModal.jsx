import  { Component } from 'react';
import { Button, TextInput } from '@aragon/ui';
import { sha256 } from 'js-sha256';
import React, { useState } from 'react';
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

class LoginModal extends Component {


  render() {
     const loginWithMagic = ()  => {
          console.log('Attempting to login via magic');
          let fm = new Fortmatic('pk_test_FDABC9E0FE176C29');
          let web3 = new Web3(fm.getProvider());
          fm.user.login().then(() => {
              web3.eth.getAccounts((error, accounts) => {
                  let myAccount = accounts.toString();
                  console.log('Magic accounts',myAccount);
                  this.setState({ethAddress: myAccount});
                  console.log('Magic state:', this.state);
              }).then(console.log); // ['0x...']
          });
      }
    return (
        <div>
          <h1> Hey guys </h1>
          <Button onClick={this.loginWithMagic} label="Login Magic" />
          <Button onClick={this.connectAragon} label="Connect Aragon" />
        </div>
      )
   }
}

export default LoginModal
