import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {  Navbar } from 'react-bootstrap';
import { Main, Header, Button, Split, Bar, LoadingRing, IconIdentity, Box as AragonBox } from '@aragon/ui'
import Box from '3box';
import Votes from "./components/Votes";
import Notebook from "./components/Notebook";
import Resources from "./components/Resources";
import ProfileHover from 'profile-hover';
import EditProfile from '3box-profile-edit-react';
import ChatBox from '3box-chatbox-react';
export default class App extends Component {

  state = {
    web3enabled: false,
    box: false,
    space: false,
    address: false,
    accounts: false
}


async getAddressFromMetaMask() {
  if (typeof window.ethereum == "undefined") {
    this.setState({ needToAWeb3Browser: true });
  } else {
    window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
    const accounts = await window.ethereum.enable();
    this.setState({ web3enabled: true });
    this.setState({accounts: accounts });
  }
}
async auth3box() {
  const address = this.state.accounts[0];
  this.setState({address: address});
  const spaces = ['3Book'];
  const box = await Box.create(window.ethereum);
  await box.auth(spaces, { address });
  await box.syncDone;
  this.setState({box: box });
}

async componentDidMount() {
  await this.getAddressFromMetaMask();
  if (this.state.accounts) {
    // Now MetaMask's provider has been enabled, we can start working with 3Box
    await this.auth3box();
    await Box.listSpaces(this.state.address);
    const space = await this.state.box.openSpace('MyFollowing');
    await space.syncDone;
    this.setState({space});
  }
}



  render() {

      return (
        <Main theme="dark">
          <Router>
            <Bar className="pushUp" style={{ width: "100%"}}>
            <Header
            primary={
                <div className="fullWidth sideMargin bottomPadding buttonContainer">
                    <Link className="fullWidth navLink" to="/resources">Resources</Link>
                    <Link className="fullWidth navLink" to="/votes">Votes</Link>
                    <Link className="fullWidth navLink" to="/notes">Notebook</Link>
                    <Link className="fullWidth navLink" to="/chat">Chat</Link>
                    <Link className="fullWidth navLink" to="/profile">Profile</Link>
               </div>
            }
            secondary={     <Navbar.Brand  style={{ fontWeight: "bold", fontSize: "1.8em", width: "100%", position: "relative", top: "-2px", marginRight: "15px"}} href="/">Research Collective</Navbar.Brand>} />
            </Bar>

            <Split
                primary={
                  <AragonBox>
                    <Switch>
                      <Route path="/chat">
                        <Chat box={this.state.box} space={this.state.space} address={this.state.address}/>
                      </Route>
                      <Route path="/profile">
                        <Profile box={this.state.box} space={this.state.space} address={this.state.address}/>
                      </Route>
                      <Route path="/notes">
                        {this.state.address &&
                        <Notebook web3enabled={this.state.web3enabled} space={this.state.space}/>
                      }
                      </Route>
                      <Route path="/votes">
                        <Votes  box={this.state.box} space={this.state.space} address={this.state.address} />
                      </Route>
                      <Route path="/resources">
                      <Resources  box={this.state.box} space={this.state.space} address={this.state.address} />
                      </Route>
                      <Route path="/">
                        <Resources/>
                      </Route>
                    </Switch>
                  </AragonBox>
                }
                secondary={
                  <>
                    <AragonBox>
                       <h1 className="sectionTitle"> About </h1>
                        <br/>
                        <div>
                          <p className="sectionText"> The collision of crypto and the biological sciences presents itself before you.</p> <br/>
                          <p className="sectionText"> Our experimentalists arm themselves with etheric technology to prune the Leviathan's stranglehold on the Truth. </p> <br/>
                          <p className="sectionText"> The self-sovereignty of genetic information and knowledge production will bring nothing short of a second renaissance. </p>
                        </div>
                        <div className="fatBottomed buttonContainer">
                          <Button className="pushDown" icon={<IconIdentity/>}  mode="strong" label="Join" onClick={() =>  window.open(
                             "https://t.me/joinchat/EObaChML8AxqbUZtiyqeKQ", "_blank")} />
                        </div>
                    </AragonBox>
                  </>
                }
              />
            </Router>
        </Main>
      );
    }
  }






  class Chat extends Component {
    render() {
      return (<>
          <h1 className="pushUp sectionTitle">Chat </h1>
          <AragonBox className="flexContainer">
          <p className="pushUp centerText"><i> Nobody online? Find us on Telegram...</i></p>
           <div className="buttonContainer">
            <Button  mode="strong"  label="Join" icon={<IconIdentity/>}  />
           </div>
             {this.props.address && !this.props.space && <div>
               <LoadingRing  className="pushDown" style={{width: "100%", height: "100%"}}/>
            </div> }
              {this.props.box && this.props.space && <div className="pushDown">  <ChatBox
                  // required
                  spaceName="mySpaceName"
                  threadName="myThreadName"

                  // Required props for context A) & B)
                  box={this.props.box}
                  currentUserAddr={this.props.address}
                  />
                </div> }
          </AragonBox>
      </>);
    }
  }

class Profile extends Component {
    render() {
      return (
           <div>
             <h1 className="sectionTitle pushUp"> Profile </h1>
             <p className="sectionSubTitle pushUp"> Your Ethereal Appearance</p>

             <AragonBox className="profileContainer">
               {!this.props.address && <h1> Plz Install MetaMask Extension 😿 </h1>}
               {this.props.address &&  !this.props.space &&
                <div className="pushUp">
                  <ProfileHover className="pushUp fatBottomed" address={this.props.address} showName={true} /><br/>
                </div>
              }
               {this.props.box && this.props.space && <div>
                 <EditProfile className="textColorFix"
                    box={this.props.box}
                    space={this.props.space}
                    currentUserAddr={this.props.address}
                 />
                 </div>
               }
              </AragonBox>
            </div>
       )
    }
  }
