import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateTrip } from '../../Services/TravelsService';
import { useAppContext } from '../AppContext';
import { ModelTripsphrases } from '../../Utils/language';

function CreateTripModal({ show, onHide }) {


  const { language } = useAppContext();
  const {
    NewTrip,
      TripName,
      Transport,
      BudgetI,
      BudgetF,
      Category,
      Location,
      Description,
      Banner,
      NewTripPlace,
      TripNamePlace,
      TransportPlace,
      BudgetIPlace,
      BudgetFPlace,
      CategoryPlace,
      LocationPlace,
      DescriptionPlace,
      CTrip,
      Close,
      tipo2,
      tipo3,
      tipo4,
      tipo5,
      tipo6,
      tipo7,
      tipo8,
      tipo9,
      tipo10,
  } = ModelTripsphrases[language];


  const [tripName, setTripName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [transport, setTransport] = useState('');
  const [initialBudget, setInitialBudget] = useState('');
  const [finalBudget, setFinalBudget] = useState('');
  const [banner, setBanner] = useState(null);

  const handleFileChange = (e) => {
    setBanner(e.target.files[0]);
  };

  const handleCreateTrip = async () => {
    const formData = new FormData();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    formData.append('TripName', tripName);
    formData.append('Description', description);
    formData.append('Location', location);
    formData.append('Category', category);
    formData.append('Transport', transport);
    formData.append('InicialBudget', initialBudget);
    formData.append('FinalBudget', finalBudget);
    if (banner) {
      formData.append('banner', banner);
    }

    try {
      const response = await CreateTrip(storedUser.id, formData);

      if (response) {
        console.log('Trip created successfully:', response);
        onHide();
      } else {
        console.error('Failed to create trip:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating trip:', error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{NewTrip}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="tripName">
            <Form.Label>{TripName}</Form.Label>
            <Form.Control
              type="text"
              placeholder={TripNamePlace}
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>{Description}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={DescriptionPlace}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>{Location}</Form.Label>
            <Form.Control
              type="text"
              placeholder={LocationPlace}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>{Category}</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">{CategoryPlace}</option>
              <option value="Adventure">{tipo2}</option>
              <option value="Leisure">{tipo3}</option>
              <option value="Cultural">{tipo4}</option>
              <option value="Business">{tipo5}</option>
              <option value="Family">{tipo6}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="transport">
            <Form.Label>{Transport}</Form.Label>
            <Form.Control
              as="select"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            >
              <option value="">{TransportPlace}</option>
              <option value="Plane">{tipo7}</option>
              <option value="Bus">{tipo8}</option>
              <option value="Train">{tipo9}</option>
              <option value="Hitchhiking">{tipo10}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="initialBudget">
            <Form.Label>{BudgetI}</Form.Label>
            <Form.Control
              type="number"
              placeholder={BudgetIPlace}
              value={initialBudget}
              onChange={(e) => setInitialBudget(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="finalBudget">
            <Form.Label>{BudgetF}</Form.Label>
            <Form.Control
              type="number"
              placeholder={BudgetFPlace}
              value={finalBudget}
              onChange={(e) => setFinalBudget(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="banner">
            <Form.Label>{Banner}</Form.Label>
            <Form.Control
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {Close}
        </Button>
        <Button variant="primary" onClick={handleCreateTrip}>
          {CTrip}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTripModal;
