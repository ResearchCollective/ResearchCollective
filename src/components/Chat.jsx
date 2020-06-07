import React, {  Component } from 'react';
import { Box as AragonBox, LoadingRing, Button, Split, Box} from '@aragon/ui';
import ChatBox from '3box-chatbox-react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: [],
      space: [],
      opened: false,
      setOpened : false
     };
}

  render() {
      return (
         <div>
           <h1 className="sectionTitle"> Chat </h1>
               <Split
                  primary={ <AragonBox className="flexContainer">
                         <p className="sectionSubTitle"> P2P "Ghost" Chat - No record remains after all members leave</p>
                        {!this.props.box && <LoadingRing/>}
                        {this.props.box &&
                             <ChatBox
                                 // required
                                 spaceName="researchCollective"
                                 threadName="researchCollectiveGhostChat"
                                 box={this.props.box}
                                 currentUserAddr={this.props.address}
                                 colorTheme="#8dd79a"
                             />
                           }
                         </AragonBox>
                       }
                  secondary={<Box className="flexContainer"><p>Or, start a conversation on</p> <br/>
                  <a href="https://t.me/joinchat/EObaChML8AxqbUZtiyqeKQ"  rel="noopener noreferrer" target="_blank"><Button label="Telegram"/></a></Box>}
                />



         </div>
      )
   }
}



export default Chat;
