import React from "react";
import {Button, NavbarBrand, Nav, Navbar} from "react-bootstrap";

const Header = () => {
    return(
        <Navbar className='fixed-top'>
            <Navbar.Brand>Research Collective</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
                <Navbar.Text className='newsletter-btn'>Join Our Newsletter</Navbar.Text>
                <Button className='login-btn'>Log In</Button>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header