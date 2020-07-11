import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '@aragon/ui';
import Fortmatic from 'fortmatic';
import Web3 from 'web3';
import Voting from '@aragon/connect';
import connect from '@aragon/connect';

class Header extends Component {
  constructor(props) {
      super(props);
       this.state = {
            ethAddress: false,
       };
  }

    loginWithMagic = ()  => {
        console.log('This is from login button!!!');
        let fm = new Fortmatic('pk_test_FDABC9E0FE176C29');
        let web3 = new Web3(fm.getProvider());
        
        fm.user.login().then(() => {
            web3.eth.getAccounts((error, accounts) => {
                let myAccount = accounts.toString();
                console.log('From loginwith magic accounts',myAccount);
                this.setState({ethAddress: myAccount});
                console.log('this is state', this.state);
            }).then(console.log); // ['0x...']
        });
    }

    connectAragon = async () => {
        const org = await connect('covidresearch.aragonid.eth', 'thegraph');
        console.log("org:");
        console.log(org);
        const voting = new Voting(
            await org.app('voting').address,
            'https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-mainnet'
        );
        console.log("voting:");
        console.log(voting);
        const votes = await voting.votes();
        console.log("votes:");
        console.log(votes);
    }

render() {

  const docsURL = 'https://www.notion.so/ResearchCo-Covidathon-2ae1203029ed4c2cb4f5b6056ae7b89c'
  return(
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
    <Navbar.Brand><Link to='/'>Research Collective</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
          <Button onClick={this.loginWithMagic} label="Login Magic" />
          <Button onClick={this.connectAragon} label="Connect Aragon" />          
          <Nav.Link href='/resources'>Resources</Nav.Link>
          <Nav.Link href='/experiments'>Experiments</Nav.Link>
          <Nav.Link href='/votes'>Votes</Nav.Link>
          <Nav.Link href='/notes'>Notebook</Nav.Link>
          <Nav.Link href='/chat'>Chat</Nav.Link>
          <Nav.Link href={`${docsURL}`}>Docs</Nav.Link>
          {/* conditional rendering */}
          {this.props.ethAddress &&
                <Nav.Link href='/login' >Sign In</Nav.Link>
               }     {!this.props.ethAddress &&
               <Nav.Link href='/profile'>Profile</Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}

export default Header
