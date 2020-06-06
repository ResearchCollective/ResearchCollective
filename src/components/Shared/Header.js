import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
      super(props);
       this.state = {
            ethAddress: false,
       };
   }
render() {

  const docsURL = 'https://www.notion.so/ResearchCo-Covidathon-2ae1203029ed4c2cb4f5b6056ae7b89c'
  return(
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
    <Navbar.Brand><Link to='/'>Research Collective</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
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
