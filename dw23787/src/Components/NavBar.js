import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLoggedIn, handleLogout, id }) {

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(); // Call handleLogout function
    navigate('/', { replace: true });
  }

  return (
    <Navbar expand="lg" sticky="top" className="custom-navbar">
      <Navbar.Brand as={Link} to="/">
        <img
          src="/Logo.png"
          width="100"
          height="auto"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-2">
          {
            !isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                <Nav.Link as={Link} to="/Registo">Register</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to={`/Profile/${id}`}>
                  <img
                    className="rounded-4 shadow-4"
                    src="https://mdbootstrap.com/img/Photos/Avatars/man2.jpg"
                    alt="Avatar"
                    style={{ width: '40px', height: '40px' }}
                  />
                </Nav.Link>
                <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
              </>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
