import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateTrip } from '../../Services/TravelsService';

function CreateTripModal({ show, onHide }) {

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
        <Modal.Title>Create a New Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="tripName">
            <Form.Label>Trip Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter trip name"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Adventure">Adventure</option>
              <option value="Leisure">Leisure</option>
              <option value="Cultural">Cultural</option>
              <option value="Business">Business</option>
              <option value="Family">Family</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="transport">
            <Form.Label>Transport</Form.Label>
            <Form.Control
              as="select"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            >
              <option value="">Select transport</option>
              <option value="Plane">Plane</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Hitchhiking">Hitchhiking</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="initialBudget">
            <Form.Label>Initial Budget</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter initial budget"
              value={initialBudget}
              onChange={(e) => setInitialBudget(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="finalBudget">
            <Form.Label>Final Budget</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter final budget"
              value={finalBudget}
              onChange={(e) => setFinalBudget(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="banner">
            <Form.Label>Banner</Form.Label>
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
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateTrip}>
          Create Trip
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTripModal;
