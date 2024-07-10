import React, { useState } from 'react';
import { Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { NavBarphrases } from '../Utils/language';

function NavBar({ isLoggedIn, handleLogout, id }) {
  const { changeLanguage } = useAppContext();
  const navigate = useNavigate();
  const [selectedFlag, setSelectedFlag] = useState('/uk.svg');

  const { language } = useAppContext();
  const {
    login,
    register,
    logout,
  } = NavBarphrases[language];

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/', { replace: true });
  }

  const handleFlagSelect = (countryCode, flagImage) => {
    setSelectedFlag(flagImage);
    if (countryCode === 'PT') {
      changeLanguage('pt');
    } else if (countryCode === 'GB') {
      changeLanguage('en');
    }
    console.log('Selected flag:', countryCode);
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
        <Nav className="ml-auto mr-2" style={{alignItems: 'center'}}>

        <DropdownButton id="flag-dropdown" title={selectedFlag ? <img src={selectedFlag} alt="Selected Flag" style={{ width: '25px', height: '25px' }} /> : "Select Flag"} variant="outline-primary">
            <Dropdown.Item onClick={() => handleFlagSelect('PT', '/portugal.svg')}>
              <img src="/portugal.svg" alt="Portugal Flag" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
              Portugal
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFlagSelect('GB', '/uk.svg')}>
              <img src="/uk.svg" alt="UK Flag" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
              United Kingdom
            </Dropdown.Item>
          </DropdownButton>

          {
            !isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/Login">{login}</Nav.Link>
                <Nav.Link as={Link} to="/Registo">{register}</Nav.Link>
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
                <Nav.Link onClick={handleLogoutClick}>{logout}</Nav.Link>
              </>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
