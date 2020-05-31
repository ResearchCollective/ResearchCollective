import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import Web3Container from './Web3Container';
import ChatBox from "./ChatBoxExtended";

class Chat extends Component {

  render() {
      return (
         <Container>
            <h3> Chat </h3>
            <Web3Container web3enabled={this.web3enabled}>
                <p>  This chat will eventually permit anonymous communication to the Research Collective. </p>
                <p> Previously, this widget was modified so that each message can be optionally published to Ethereum chain. </p>
                <p> Perhaps this mechanism can be used to create comments on each list item?</p>
                <ChatBox
                    spaceName="3Book"
                    threadName="Research Collective Thread"
              />
            </Web3Container>
        </Container>
    );
  }
}

export default Chat;
