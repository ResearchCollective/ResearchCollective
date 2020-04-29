import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Navbar, Nav } from 'react-bootstrap';
import { Main, Header, Button, Split, Bar, Tag, IconPlus, Box as AragonBox, Help, useTheme } from '@aragon/ui'
import Box from '3box';
import Web3 from 'web3';
import HDWalletProvider from "@truffle/hdwallet-provider";
import Profile from "./components/Profile";
import Votes from "./components/Votes";
import Resources from "./components/Resources";
import Web3Container from "./components/Web3Container";
import ChatBox from "./components/ChatBoxExtended";

export default class App extends Component {



    state = {
      web3enabled: false,
        box: false,
        space: false,
        address: false
    }

    async getAddressFromMetaMask() {
      if (typeof window.ethereum == "undefined") {
        this.setState({ web3enabled: false });
      } else {
        window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
        const accounts = await window.ethereum.enable();
        this.setState({ web3enabled: true });
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
      this.setState({box: box });
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
        <Main>
          <Router>
            <Header>
             <Bar  style={{ width: "100%"}}>
                <Navbar  style={{ width: "100%", position: "relative", top: "5px", background: "#FFFFFF!important"}}>
                  <Navbar.Brand  style={{ fontWeight: "bold"}} href="/">Research Collective</Navbar.Brand>
                    <Nav fill style={{ width: "100%"}} >
                      <Nav.Item><Link to="/resources">Resources</Link></Nav.Item>
                      <Nav.Item><Link to="/notes">Notebook</Link></Nav.Item>
                      <Nav.Item><Link to="/chat">Chat</Link></Nav.Item>
                      <Nav.Item><Link to="/votes">Votes</Link></Nav.Item>
                      <Nav.Item><Link to="/profile">Profile</Link></Nav.Item>
                      <Nav.Item>                  <div  style={{ width: "100%",  textAlign: "right" }}>             {!this.state.web3enabled && <h6>No MetaMask ❌🦊</h6>}
                                                  {(this.state.web3enabled && !this.state.accounts) && <h6>Authorize MetaMask 🦊🤝🦄</h6>}
                                                  {this.state.web3enabled && this.state.accounts && <h6> Connected 🦊💚🧬</h6>}
                      </div></Nav.Item>
                    </Nav>
                </Navbar>
              </Bar>
            </Header>
            <Split
                primary={
                  <AragonBox>
                    <Switch>
                      <Route path="/chat">
                      {this.state.box && <ChatBox
                          spaceName="3Book"
                          threadName="3BookThread"
                          box={this.state.box}
                          currentUserAddr={this.state.accounts[0]}
                      />}
                      </Route>
                      <Route path="/profile">
                        <Profile box={this.state.box} space={this.state.space} address={this.state.address} web3enabled={this.state.web3enabled}/>
                      </Route>
                      <Route path="/notes">
                        <Notes web3enabled={this.state.web3enabled} space={this.state.space}/>
                      </Route>
                      <Route path="/votes">
                        <Votes />
                      </Route>
                      <Route path="/resources">
                      <Resources/>
                      </Route>
                    </Switch>
                  </AragonBox>
                }
                secondary={
                  <>
                    <AragonBox>
                       <h1 className="sectionTitle"> About </h1>
                        <p className="sectionSubTitle"> the Research Collective</p>
                        <br/>
                        <div>
                          <p className="sectionText"> The colission of crypto and the biological sciences presents itself before you.</p> <br/>
                          <p className="sectionText"> Our researchers arm themselves with etheric technology to fight the Leviathan's stranglehold on the Truth. </p> <br/>
                          <p className="sectionText"> The self-sovereignty of genetic information and knowledge production will bring nothing short of a second renaissance. </p>
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


  class Chat extends Component {
    render() {
      return (<>
        <h1>Amnesia Chat</h1>
          {console.log("chat time!")}
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
