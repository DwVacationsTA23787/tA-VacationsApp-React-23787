import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (

        <Navbar expand="lg" sticky="top" className="custom-navbar">
            <Navbar.Brand as={Link} to="/">
                <img
                    src="/Logo.png"
                    width="100" // Adjust width as needed
                    height="auto"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto mr-2">
                    <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/Registo">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavBar
