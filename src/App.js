import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {  Navbar, Nav } from 'react-bootstrap';
import { Main, Header, Button, Modal, Split, Bar, IconExternal, IconIdentity, Box as AragonBox } from '@aragon/ui'
import Box from '3box';
import Web3 from 'web3';
import HDWalletProvider from "@truffle/hdwallet-provider";
import Votes from "./components/Votes";
import Resources from "./components/Resources";
import ProfileHover from 'profile-hover';
import EditProfile from '3box-profile-edit-react';
import './styles/style.css';
import Home from './pages/Home'

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
  const spaces = ['3Book'];
  const box = await Box.create(window.ethereum);
  await box.auth(spaces, { address });
  await box.syncDone;
  this.setState({address: address})
  this.setState({box: box });
}

async componentDidMount() {
  await this.getAddressFromMetaMask();
  if (this.state.accounts) {
    // Now MetaMask's provider has been enabled, we can start working with 3Box
    await this.auth3box();
    const space = await this.state.box.openSpace('3Book');
    await space.syncDone;
    this.setState({space});
  }
}
  render() {

      return(
          <Router>
              <Header>
                  <Bar  style={{ width: "100%"}}>
                    <Navbar  style={{ width: "100%", position: "relative", top: "5px"}}>
                        <Navbar.Brand  style={{ fontWeight: "bold", marginLeft: "15px"}} href="/">Research Collective</Navbar.Brand>
                        <Nav fill style={{ width: "100%"}} >
                            <Nav.Item><Link to="/resources">Resources</Link></Nav.Item>
                            <Nav.Item><Link to="/votes">Votes</Link></Nav.Item>
                            <Nav.Item><Link to="/notes">Notebook</Link></Nav.Item>
                            <Nav.Item><Link to="/chat">Chat</Link></Nav.Item>
                            <Nav.Item><Link to="/profile">Profile</Link></Nav.Item>
                            <Nav.Item>
                                <div  style={{ width: "100%",  textAlign: "right" }}>
                                    {!this.state.web3enabled && <h6>No MetaMask ❌🦊</h6>}
                                    {(this.state.web3enabled && !this.state.accounts) &&
                                        <h6>Authorize MetaMask 🦊🤝🦄</h6>}
                                    {this.state.web3enabled && this.state.accounts && <h6> Connected 🦊💚🧬</h6>}
                                </div>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                  </Bar>
              </Header>

              <Switch>
                  <Route exact path='/' component={Home}/>
              </Switch>

          </Router>
      )
  }

    //   return (
    //     <Main theme="dark">
    //       <Router>
    //         <Header>
    //          <Bar  style={{ width: "100%"}}>
    //             <Navbar  style={{ width: "100%", position: "relative", top: "5px"}}>
    //               <Navbar.Brand  style={{ fontWeight: "bold", marginLeft: "15px"}} href="/">Research Collective</Navbar.Brand>
    //                 <Nav fill style={{ width: "100%"}} >
    //                   <Nav.Item><Link to="/resources">Resources</Link></Nav.Item>
    //                   <Nav.Item><Link to="/votes">Votes</Link></Nav.Item>
    //                   <Nav.Item><Link to="/notes">Notebook</Link></Nav.Item>
    //                   <Nav.Item><Link to="/chat">Chat</Link></Nav.Item>
    //                   <Nav.Item><Link to="/profile">Profile</Link></Nav.Item>
    //                   <Nav.Item>                  <div  style={{ width: "100%",  textAlign: "right" }}>             {!this.state.web3enabled && <h6>No MetaMask ❌🦊</h6>}
    //                                               {(this.state.web3enabled && !this.state.accounts) && <h6>Authorize MetaMask 🦊🤝🦄</h6>}
    //                                               {this.state.web3enabled && this.state.accounts && <h6> Connected 🦊💚🧬</h6>}
    //                   </div></Nav.Item>
    //                 </Nav>
    //             </Navbar>
    //           </Bar>
    //         </Header>
    //         <Split
    //             primary={
    //               <AragonBox>
    //                 <Switch>
    //                   <Route path="/chat">
    //                     <Chat/>
    //                   </Route>
    //                   <Route path="/profile">
    //                     {this.state.box &&
    //                     <Profile  box={this.state.box} space={this.state.space} address={this.state.address}/>
    //                     }
    //                   </Route>
    //                   <Route path="/notes">
    //                     <Notes web3enabled={this.state.web3enabled} space={this.state.space}/>
    //                   </Route>
    //                   <Route path="/votes">
    //                     <Votes />
    //                   </Route>
    //                   <Route path="/resources">
    //                   <Resources/>
    //                   </Route>
    //                   <Route path="/">
    //                     <Home/>
    //                   </Route>
    //                 </Switch>
    //               </AragonBox>
    //             }
    //             // secondary={
    //             //   <>
    //             //     <AragonBox>
    //             //        <h1 className="sectionTitle"> About </h1>
    //             //         <p className="sectionSubTitle"> the Research Collective</p>
    //             //         <br/>
    //             //         <div>
    //             //           <p className="sectionText"> The collision of crypto and the biological sciences presents itself before you.</p> <br/>
    //             //           <p className="sectionText"> Our experimentalists arm themselves with etheric technology to prune the Leviathan's stranglehold on the Truth. </p> <br/>
    //             //           <p className="sectionText"> The self-sovereignty of genetic information and knowledge production will bring nothing short of a second renaissance. </p>
    //             //         </div>
    //             //         <div className="fatBottomed buttonContainer">
    //             //           <Button className="pushDown" icon={<IconIdentity/>}  mode="strong" label="Join" onClick={() =>  window.open(
    //             //              "https://t.me/joinchat/EObaChML8AxqbUZtiyqeKQ", "_blank")} />
    //             //         </div>
    //             //     </AragonBox>
    //             //   </>
    //             // }
    //           />
    //         </Router>
    //     </Main>
    //   );
    // }
  }






  class Chat extends Component {
    render() {
      return (<>
          <h1 className="pushUp sectionTitle">Chat </h1>
          <h1 className="sectionSubTitle pushUp"><i>🚨Under Construction🚨</i></h1>
          <AragonBox className="notesContainer" >
            <p className="pushUp">Researchers will be able to communicate here,
            <br/> in a relatively secure manner, via 3Box.</p><br/>
            <p className="pushUp"><i> For now, there is Telegram...</i></p>
               <Button  mode="strong"  label="Join" icon={<IconIdentity/>}/>
            </AragonBox>
      </>);
    }
  }

  class Notes extends Component {
    render() {
      return (
        <div>
          <h1 className="sectionTitle pushUp">Notebook </h1>
          <h1 className="sectionSubTitle pushUp"><i>🚨Under Construction🚨</i></h1>
          <AragonBox className="notesContainer" >
            <p className="pushUp"><i>Researchers will be able to stash encypted or public notes here.</i></p><br/>
               <p className="pushUp"><i>These notes will be 'hashed and stashed' and will be accessible by one's 3box/MetaMask account.
              </i></p>
            </AragonBox>
        </div>
      )
    }
  }

  // class Home extends Component {
  //     render() {
  //       return ( <>
  //         <h1 className="bigTitle"> Welcome Home, Researcher </h1>
  //         </>
  //       )
  //     }
  // }

class Profile extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
           <div>
           <h1 className="sectionTitle pushUp"> Profile </h1>
           <p className="sectionSubTitle pushUp"> Your Ethereal Appearance</p>
              <AragonBox className="profileContainer">
              {this.props.address && <div className="pushUp">
                  <ProfileHover className="pushUp fatBottomed" address={this.props.address} showName={true} /><br/>
                  <a  rel="noopener noreferrer" target="_blank" href={"https://3box.io/" + this.props.address}><Button className="pushDown" label="Edit on 3Box" icon={<IconExternal/>}/></a>
                </div>}
              </AragonBox>
          </div>
      );
    }
  }
