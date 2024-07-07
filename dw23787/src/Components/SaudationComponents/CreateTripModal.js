import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function CreateTripModal({ show, onHide }) {

    const [tripName, setTripName] = useState('');
    const [description, setDescription] = useState('');
  
    const handleCreateTrip = () => {
      onHide();
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
  )
}

export default CreateTripModal
