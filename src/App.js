import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Button, Navbar, Nav, Container, Row, Card } from 'react-bootstrap';
import ProfileHover from 'profile-hover';
import Box from '3box';
import Web3 from 'web3';
import HDWalletProvider from "@truffle/hdwallet-provider";
import ChatBox from "./ChatBoxExtended";
import colorado from "../src/assets/Screen Shot 2020-02-15 at 7.28.07 PM.png"
import CredentialCard from "./components/CredentialCard"


export default class App extends Component {

  state = {
    needToAWeb3Browser: false,
  }

  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }


  async getWeb3(){
    const mnemonic = "mountains supernatural bird angle hello monster elegant entangle holy crap excellent manure"; // 12 word mnemonic
    let provider = new HDWalletProvider(mnemonic, "http://localhost:8545");
    // HDWalletProvider is compatible with Web3. Use it at Web3 constructor, just like any other Web3 Provider
    const web3 = new Web3(provider);
    const accounts = web3.defaultAccount;
    this.setState({  accounts, web3 });
  }


  async auth3box() {
    const address = this.state.accounts[0];
    const spaces = ['3Book'];
    // const box = await Box.create(this.state.web3);
    const box = await Box.create(window.ethereum);
    await box.auth(spaces, { address });
    await box.syncDone;
    this.setState({ box });
  }



  async componentDidMount() {
    await this.getAddressFromMetaMask();
    // await this.getWeb3();
    if (this.state.accounts) {
      // Now MetaMask's provider has been enabled, we can start working with 3Box
      await this.auth3box();

      const space = await this.state.box.openSpace('3Book');
      await space.syncDone;
      console.log("hello!");
      this.setState({space});

    }
  }
  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>
    }


    return (
      <Router>
        <div>
          <Navbar bg="light" expand="lg" style={{ minHeight: '40px' }}>
            {this.state.accounts && (
              <Nav fill style={{ width: "100%" }} >
                <Nav.Item><Link to="/">Home</Link></Nav.Item>
                <Nav.Item><Link to="/credentials">Credentials</Link></Nav.Item>
                <Nav.Item><Link to="/notes">Notes</Link></Nav.Item>
                <Nav.Item><Link to="/chat">Chat</Link></Nav.Item>
              </Nav>
            )}

          </Navbar>
          <div className="container" style={{ paddingTop: '50px' }}>
            {this.state.needToAWeb3Browser && <h2>Please install metamask🦊</h2>}
            {(!this.state.needToAWeb3Browser && !this.state.accounts) && <h2>Connect MetaMask🤝</h2>}

            {this.state.accounts && (
              <Switch>
                <Route path="/chat">
                  <Chat/>
                  {this.state.box && <ChatBox
                      spaceName="3Book"
                      threadName="3BookThread"
                      box={this.state.box}
                      currentUserAddr={this.state.accounts[0]}
                  />}
                </Route>
                <Route path="/credentials">
                  <Credentials/>
                  {/*TODO: each address would be completely unique - sourced from a seed phrase like an HD wallet*/}
                  <Container>
                    <Row>
                      <CredentialCard name={"Drivers License"} address={this.state.accounts[0]} >
                      </CredentialCard>
                      <CredentialCard name={"Cosmetology"} address={this.state.accounts[0]} >
                      </CredentialCard>
                      <CredentialCard name={"Medical Marijuana"} address={this.state.accounts[0]} >
                      </CredentialCard>
                      <CredentialCard name={"License to Kill"} address={this.state.accounts[0]} >
                      </CredentialCard>
                    </Row>
                </Container>
                </Route>
                <Route path="/profile">
                  <Profile
                    ethAddress={this.state.accounts[0]}
                  />
                </Route>
                <Route path="/notes">
                  <Notes space={this.state.space}/>
                </Route>
                <Route path="/">
                  <Home
                    ethAddress={this.state.accounts[0]}
                  />
                </Route>


              </Switch>
            )}

          </div>
        </div>
      </Router>
    );
  }
}


class Home extends Component {
  render() {
    return (<>
      <img src={colorado} alt={"colorado"}/>
      <h1>Colorado Self Sovereign ID</h1>
      <ProfileHover address={this.props.ethAddress} showName={true} />
    </>);
  }
}
class Credentials extends Component {
  render() {
    return (<>
      <h1>Credentials</h1>
    </>);
  }
}

class Profile extends Component {
  render() {
    return (<>
      <h1>Profile</h1>
    </>);
  }
}

class Chat extends Component {
  render() {
    return (<>
      <h1>Amnesia Chat</h1>
        {console.log("chat time!")}
    </>);
  }
}



class Notes extends Component {

  state = {
    view: false
  }

  publicSave = async (e) => {
    e.preventDefault();
    //saves to a public 3Box space
    await this.props.space.public.set(Date.now(), this.state.publicNoteToSave);

    this.setState({publicNoteToSave : null});
    console.log("saved")
    this.getPublicNotes();
  }

  privateSave = async (e) => {
    e.preventDefault();

    //saves to a private 3Box space
		await this.props.space.private.set(Date.now(), this.state.privateNoteToSave);

    this.setState({privateNoteToSave : null});
    console.log("saved");
    this.getPrivateNotes();
  }


  getPublicNotes = async () => {
    const publicNotes = await this.props.space.public.all();
    this.setState({ publicNotes });
  }

  getPrivateNotes = async () => {
    const privateNotes = await this.props.space.private.all();
    this.setState({ privateNotes });
  }

  componentDidUpdate(){
    if(this.props.space && (!this.state.privateNotes || !this.state.publicNotes)){
      this.getPublicNotes();
      this.getPrivateNotes();
    }
  }

  render() {


    return (
      <div>
        <h2>Notes</h2>
        <br />
        <Button onClick={() => (this.setState({ view: !this.state.view }))}> {this.state.view ? "Add" : "View"}</Button>
        {!this.state.view && this.props.space && (<>
          <h3>📖Public</h3>
          <FormComponent
            handleSubmit={this.publicSave}
            onChange={(e)=>(this.setState({publicNoteToSave : e.target.value}))}
            value={this.state.publicNoteToSave}
            label="Save a Public Note"
            text="This text will be saved publicly on 3Box"
          />
          <br />

          <h3>🗝Private</h3>
          <FormComponent
            handleSubmit={this.privateSave}
            onChange={(e)=>(this.setState({privateNoteToSave : e.target.value}))}
            value={this.state.privateNoteToSave}
            label="Save a Private Note"
            text="This text will be encrypted and saved with 3Box"
          />
        </>)}

        {this.state.view && <>
          <h2>View</h2>
          <br />
          <h3>📖Public</h3>
          {this.state.publicNotes &&  Object.values(this.state.publicNotes).map(note => <p>{note}</p>)}
          <br />
          <h3>🗝Private</h3>
          {this.state.privateNotes && Object.values(this.state.privateNotes).map(note => <p>{note}</p>)}
        </>}

      </div>
    )
  }
}

class FormComponent extends Component {



  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>

        <Form.Group>
          <Form.Label>{this.props.label}</Form.Label>
          <Form.Control
            type="text-area"
            as="textarea"
            placeholder="Note text"
            value={this.props.value || ""}
            onChange={this.props.onChange} />
          <Form.Text className="text-muted">
            {this.props.text}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>)
  }
}

