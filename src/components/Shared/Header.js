import React, { Component } from 'react';
import { Nav, Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
class Header extends Component {
  constructor(props) {
      super(props);
       this.state = {
            ethAddress: false,
       };
   }
render() {
  return(
      <Navbar bg="light" expand="lg" style={{ minHeight: '40px' }}>
      <Navbar.Brand><Link to="/">Research Collective</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav fill style={{ width: "100%" }} >
            <Nav.Item><Link to="/resources">Resources</Link> 🧪</Nav.Item>
            <Nav.Item><Link to="/experiments">Experiments</Link> ⚗️</Nav.Item>
            <Nav.Item><Link to="/votes">Votes</Link> 🗳</Nav.Item>
            <Nav.Item><Link to="/notes">Notebook</Link> 📘</Nav.Item>
            <Nav.Item><Link to="/chat">Chat</Link> 🗯</Nav.Item>
            <Nav.Item><Link to="/docs">Docs</Link> 📃</Nav.Item>
              {this.props.ethAddress &&
                <Nav.Item><Link to="/login">Sign In</Link> 🦊</Nav.Item>
              }     {!this.props.ethAddress &&
              <Nav.Item><Link to="/profile">Profile </Link> 🥼</Nav.Item>
              }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      )
  }
}

export default Header
