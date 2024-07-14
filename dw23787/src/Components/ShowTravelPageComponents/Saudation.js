import React, { useEffect, useState } from 'react';
import './Saudation.css';
import CreateTripModal from '../SaudationComponents/CreateTripModal';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { useAppContext } from '../../Components/AppContext';
import { ShowTravelsphrases } from '../../Utils/language';

function Saudation() {

  // App context variables for language conversion.
  const { language } = useAppContext();
  const {
      HI,
      search,
  } = ShowTravelsphrases[language];

  // UseState Variables
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  // Grab user from localstorage
  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (userLocal) {
      setUser(userLocal);
    }
  }, []);

  // Functions to be passed to createTripModal in order to show or close him.
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Row className="justify-content-between">
        {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
    <Col>
      {user ? (
        <>
          <p className="saudation-text">{HI}, {user.name}</p>
          <p className="saudation-subtext">{search}</p>
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

    <CreateTripModal setAlert={setAlert} show={showModal} onHide={handleCloseModal} />
  </Row>
  );
}

export default Saudation;
