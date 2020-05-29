import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
var QRCode = require('qrcode.react');

class CredentialProver extends Component {
//     constructor(props){
//     super(props)
//     }
//     state = {
//       isOpen: false
//     };




  render() {

    return (
      <div style={{width: '200px'}}>
        {this.state.isOpen ?
        <>
                <div id="credentialActive">
                    <QRCode value="http://facebook.github.io/react/" />
                    <Button id="credentialButton" onClick={this.toggleQR}> Hide Credential </Button>
                </div>
</> :
        <div id="credentialInactive">
                     <Button id="credentialButton" onClick={this.toggleQR}> Reveal Credential </Button>
                </div>
        }

      </div>
    );
  }
}


export default CredentialProver;
