import React, { Component } from 'react';
import {Button, Card} from 'react-bootstrap';
import Row from "react-bootstrap/Row";
var QRCode = require('qrcode.react');

class CredentialCard extends Component {
  constructor(props) {
    super(props);
  }
    state = {
        isOpen: true
    };


  render() {
      return (
      <div style={{width: '400px', margin: '20px'}}>

          <Card>
              <Card.Title>
                  {/*<ProfileHover address={this.props.address} showName={false} />*/}
                  <h3>{this.props.name}</h3>
              </Card.Title>
              <Card.Body>
                  {this.state.isOpen ?   <Button id="credentialButton" onClick={ ()=>
                  {
                      let newState = this.state.isOpen;
                      newState = !newState;
                      this.setState ({ isOpen:newState });
                  }
                  }> Reveal Credential </Button>
                      :  <div id="credentialActive">
                          <QRCode value={"https://etherscan.io/address/" + this.props.address} />
                          <Row style={{marginTop:"20px", marginBottom:"20px"}}>
                          <Button   size={"lg"} onClick={()=>{
                              const params = [{
                                  "from": this.props.address,
                                  "to": this.props.address,
                                  "gas": "0x76c0", // 30400
                                  "gasPrice": "0x84e72a000", // 10000000000000
                                  "value": "0x0", // 2441406250
                                  "data": "My name is Ian Philips and I approve this message.",
                              }]
                              console.log();
                              window.ethereum.sendAsync(
                                  { method: 'eth_sendTransaction', params },
                                  (err, response) => {

                                      if (err || response.error) {
                                          console.log(err || response.error)
                                      } else {
                                          const { result } = response
                                          console.log(result)
                                      }
                                  })
                          }}> PROVE </Button>
                          </Row>

                      <Row style={{marginTop:"20px", marginBottom:"20px"}}>
                          <Button id="credentialButton" onClick={ ()=>
                          {
                              let newState = this.state.isOpen;
                              newState = !newState;
                              this.setState ({ isOpen:newState });
                          }
                          }> Hide Credential </Button>
                      </Row>
                      </div>}
              </Card.Body>
          </Card>
      </div>
    );
  }
}


export default CredentialCard;
