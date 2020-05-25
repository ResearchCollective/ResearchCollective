import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { Main, Header, Button, Modal, Split, Bar, IconExternal, IconIdentity, Box as AragonBox } from '@aragon/ui'
import Box from '3box';
import Votes from "./components/Votes";
import Notebook from "./components/Notebook";
import Resources from "./components/Resources";
import ProfileHover from 'profile-hover';
import EditProfile from '3box-profile-edit-react';
import './styles/style.css';
import Navbar from './components/Shared/Header';
import Home from './pages/Home';

class App extends Component {

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
            <Navbar bg="light" expand="lg"   ethAddress={this.props.address} style={{ minHeight: '40px' }}>
            </Navbar>
            <Main  theme={'dark'}>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path="/chat">
                        <Chat/>
                    </Route>
                    <Route path="/profile">
                        {this.state.box &&
                            <Profile  box={this.state.box} space={this.state.space} address={this.state.address}/>
                        }
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
                </Main>
            </Router>
        )
    }
}


  class ItemComment extends Component {
    render() {
      return (<>
          {this.props.box && this.props.space &&
            <h1
                // required
                spaceName="researchCollective"
                threadName="testThread"
                adminEthAddr={this.props.address}


                // Required props for context A) & B)
                box={this.props.box}
                currentUserAddr={this.props.address}
            />
      }
      </>
    )
  }
}



class Chat extends Component {
    render() {
        return (<>
            <h1 className="sectionTitle">Chat </h1>
            <h1 className="sectionSubTitle"><i>🚨Under Construction🚨</i></h1>
            <AragonBox className="notesContainer" >
                <p className="pushUp">Communicate with other researchers here anonymously.</p><br/>
                <p><i> Or join us on</i></p>
                <Button  mode="strong"  label="Telegram"/>
            </AragonBox>
        </>);
    }
}

class Notes extends Component {
    render() {
        return (
            <div>
                <h1 className="sectionTitle">Notebook </h1>
                <h1 className="sectionSubTitle"><i>🚨Under Construction🚨</i></h1>
                <AragonBox className="notesContainer" >
                    <p><i>Researchers will be able to stash encypted or public notes here.</i></p><br/>
                    <p><i>These notes will be 'hashed and stashed' and will be accessible by one's 3box/MetaMask account.
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
                <h1 className="sectionTitle"> Profile </h1>
                <p className="sectionSubTitle"> Your Ethereal Appearance</p>
                <AragonBox className="profileContainer">
                    {this.props.address && <div className="pushUp">
                        <ProfileHover className="fatBottomed" address={this.props.address} showName={true} /><br/>
                        <a  rel="noopener noreferrer" target="_blank" href={"https://3box.io/" + this.props.address}><Button className="pushDown" label="Edit on 3Box" icon={<IconExternal/>}/></a>
                    </div>}
                </AragonBox>
            </div>
        );
    }
}

export default App
