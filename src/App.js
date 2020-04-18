import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Button, Navbar, Nav, Container, Row, Card } from 'react-bootstrap';
import ProfileHover from 'profile-hover';
import Box from '3box';
import Web3 from 'web3';
import HDWalletProvider from "@truffle/hdwallet-provider";
import Profile from "./components/Profile";
import About from "./components/About";
import Chat from "./components/Chat";
import Registry from "./components/Registry";
import Web3Container from "./components/Web3Container";

export default class App extends Component {

  state = {
    web3enabled: true,
  }

  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ web3enabled: false });
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
    return (
      <Router>
        <div>
          <Navbar bg="light" expand="lg" style={{ minHeight: '40px' }}>
            <Navbar.Brand href="#home">Research Collective</Navbar.Brand>
              <Nav fill style={{ width: "100%"}} >
                <Nav.Item><Link to="/">Registry</Link></Nav.Item>
                <Nav.Item><Link to="/about">About</Link></Nav.Item>
                <Nav.Item><Link to="/profile">Profile</Link></Nav.Item>
                <Nav.Item><Link to="/notes">Notebook</Link></Nav.Item>
                <Nav.Item><Link to="/chat">Chat</Link></Nav.Item>

              </Nav>

          </Navbar>
          <div className="statusBar">
            {!this.state.web3enabled && <h6>No MetaMask ❌🦊</h6>}
            {(this.state.web3enabled && !this.state.accounts) && <h6>MetaMask detected; please Authorize Connection 🦊🤝🦄</h6>}
            {this.state.web3enabled && this.state.accounts && <h6> MetaMask connected as {this.state.accounts} </h6>}

          </div>
          <div className="container" style={{ paddingTop: '50px' }}>
              <Switch>
                <Route path="/chat">
                  <Chat web3enabled={this.state.web3enabled} box={this.state.box} />
                </Route>
                <Route path="/profile">
                  <Profile web3enabled={this.state.web3enabled}/>
                </Route>
                <Route path="/about">
                  <About/>
                </Route>
                <Route path="/notes">
                  <Notes web3enabled={this.state.web3enabled} space={this.state.space}/>
                </Route>
                <Route path="/">
                <Registry />
                </Route>
              </Switch>
            </div>
        </div>
      </Router>
    );
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
        <h2>Notebook</h2>
        <p>Your notes here will be accessible via your MetaMask/Ethereum account.</p>
        <br />
        <Web3Container>
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
          </Web3Container>
      </div>
    )
  }
}


class Home extends Component {
  render() {
    return (<>
      <h1>COVID-19 Resources</h1>
    </>);
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
