  import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main, Button, Split, IconExternal, Box as AragonBox } from '@aragon/ui'
import Box from '3box';
import Votes from "./components/Votes";
import Notebook from "./components/Notebook";
import Resources from "./components/Resources";
import ProfileHover from 'profile-hover';
import EditProfile from '3box-profile-edit-react';
import ChatBox from '3box-chatbox-react';
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
        const spaces = ['researchCollective'];
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
            const space = await this.state.box.openSpace('researchCollective');
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
                        <Chat  box={this.state.box} address={this.state.address}/>
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
                        <Votes   box={this.state.box} address={this.state.address} />
                    </Route>
                    <Route path="/resources">
                        <Resources   box={this.state.box} address={this.state.address} />
                    </Route>
                </Switch>
                </Main>
            </Router>
        )
    }
}






class Chat extends Component {
    render() {
        return (<>
            <h1 className="sectionTitle">Chat </h1>
            <Split
             primary={            <AragonBox>
                             <p>anonymous research communication</p><br/>
                                 {this.props.address && this.props.box &&
                                   <ChatBox spaceName="researchCollective" colorTheme="#00a7e1" box={this.props.box} currentUserAddr={this.props.address} threadName="researchConversation"  />
                                 }

                         </AragonBox>}
             secondary={
               <>
                 <AragonBox className="fullWidth">
                 <p className="centerText"><i>pseudonymous communication on</i></p>
                 <Button  mode="strong"  label="Telegram"/>
                 </AragonBox>
               </>
             }> </Split>

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

class Profile extends Component {

    render() {
        return (
            <div>
                <h1 className="sectionTitle"> Profile </h1>
                <p className="sectionSubTitle"> Edit your 3Box and Research Collective Persona</p>
                <AragonBox className="profileContainer">
                {this.props.space && this.props.box &&
                        <EditProfile
                        // required
                        box={this.props.box}
                        space={this.props.space}
                        currentUserAddr={this.props.address}
                    />
                    }
                </AragonBox>
            </div>
        );
    }
}

export default App
