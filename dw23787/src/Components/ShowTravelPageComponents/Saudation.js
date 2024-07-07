import React, { useEffect, useState } from 'react';
import './Saudation.css';
import CreateTripModal from '../SaudationComponents/CreateTripModal';
import { Button, Col, Row } from 'react-bootstrap';

function Saudation() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (userLocal) {
      setUser(userLocal);
    }
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Row className="justify-content-between">
    <Col>
      {user ? (
        <>
          <p className="saudation-text">Hi, {user.name}</p>
          <p className="saudation-subtext">Let's search for a new travel!</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Col>
    <Col className="col-auto">
      {user && (
        <Button className='m-2' variant="success" onClick={handleShowModal}>
         <i class="bi bi-plus-circle"></i>
        </Button>
      )}
    </Col>

    <CreateTripModal show={showModal} onHide={handleCloseModal} />
  </Row>
  );
}

export default Saudation;
