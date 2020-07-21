import './styles/style.css';

import Box from '3box';
import EditProfile from '3box-profile-edit-react';
import { Box as AragonBox, Main } from '@aragon/ui';
import Fortmatic from 'fortmatic';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Web3 from 'web3';

import Chat from './components/Chat';
import Experiments from './components/experiments/Experiments';
import Header from './components/Header/Header';
import Notebook from './components/Notebook';
import Resources from './components/Resources';
import Votes from './components/Votes';
import Home from './pages/Home';

class App extends Component {

state = {
    web3enabled: false,
    box: false,
    space: false,
    notes: [],
    address: false,
    account: null,
}

    // //get research-coolective space//
    // get3BoxSpaceForNotes  = async () => {
    //     // create a 3Box instance//
    //     const provider = await Box.get3idConnectProvider()
    //     const box = await Box.create(provider)
    //     let rsSpace = await box.openSpace('Research-Collective')
    //     this.setState({notesSpace:rsSpace})
    // }

    // // to create a thread for storing notes//
    // joinNotesThread = async () => {
    //     // create a 3Box instance//
    //     const provider = await Box.get3idConnectProvider()
    //     const box = await Box.create(provider)
    //     let rsSpace = await box.openSpace('Research-Collective')
    //     const notesThread = await rsSpace.joinThread('Notes')
    //     this.setState({notes:notesThread})
    // }

//    async getAddressFromMetaMask() {
//        if (typeof window.ethereum == "undefined") {
//           this.setState({ noWeb3Browser: true });
  //      } else {
  //          window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
  //          const account = await window.ethereum.enable();
  //          this.setState({ web3enabled: true });
  //          this.setState({account: account });
  //          console.log(this.state.account)
  //      }
    //}

    async auth3box() {
        const address = this.state.address;
        const spaces = ['researchCollective'];
        const box = await Box.create(window.ethereum);
        await box.auth(spaces, { address });
        await box.syncDone;
        this.setState({address: address})
        this.setState({box: box });
    }

    loginMagic = async () => {
         console.log('Attempting to login via magic');
         let fm = new Fortmatic('pk_test_FDABC9E0FE176C29');
         let web3 = new Web3(fm.getProvider());
         fm.user.login().then(() => {
             web3.eth.getAccounts((error, accounts) => {
                 let myAccount = accounts.toString();
                 console.log('Magic account:', myAccount);
                 this.setState({address: this.address});
                 console.log('Magic address:', this.address);

             }).then(console.log);
         });
     }

    async open3BoxSpace() {
      console.log('Opening 3Box Space');
      await this.auth3box();
      const space = await this.state.box.openSpace('researchCollective');
      await space.syncDone;
      this.setState({space: space});
      console.log('Space set: ', this.state.space);
    }

     loginMetaMask = async () => {
      if (typeof window.ethereum == "undefined") {
          this.setState({ noWeb3Browser: true });
      } else {
          window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
          const account = await window.ethereum.enable();
          this.setState({ web3enabled: true });
          this.setState({account: account });
          console.log(this.state.account)
      }
        if (this.state.account) {
          console.log("Metamask enabled")
          // Now MetaMask's provider has been enabled, we can start working with 3Box
    }
  }


    render() {
        return(
            <Router>
             <Header ethAddress={this.props.address} style={{ minHeight: '40px' }}/>
                <Main theme={'dark'}>
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
                       <Notebook web3enabled={this.state.web3enabled} address={this.state.address} box={this.state.box} space={this.state.space}/>
                    </Route>
                    <Route path="/experiments">
                        <Experiments web3enabled={this.state.web3enabled} space={this.state.space}/>
                    </Route>
                    <Route path='/docs' component={() => {
                         window.location.href = 'https://www.notion.so/Research-Collective-2ae1203029ed4c2cb4f5b6056ae7b89c';
                         return null;
                    }}/>
                    <Route path="/votes">
                        <Votes   box={this.state.box} address={this.state.address} />
                    </Route>
                    <Route path="/resources">
                        <Resources   box={this.state.box}  loginMagic={this.loginMagic} loginMetaMask={this.loginMetaMask} space={this.state.space} address={this.state.address} />
                    </Route>
                </Switch>
              </Main>
            </Router>
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
