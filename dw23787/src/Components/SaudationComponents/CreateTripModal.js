import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateTrip } from '../../Services/TravelsService';
import { useAppContext } from '../AppContext';
import { ModelTripsphrases } from '../../Utils/language';
import { countries } from '../../Utils/countrys';

function CreateTripModal({ show, onHide, setAlert }) {

  // App context variables for language conversion.
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


  // UseState Variables
  const [tripName, setTripName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [transport, setTransport] = useState('');
  const [initialBudget, setInitialBudget] = useState('');
  const [finalBudget, setFinalBudget] = useState('');
  const [banner, setBanner] = useState(null);


  // UseState Errors
  const [descriptionError, setDescriptionError] = useState('');
  const [nameError, setNameError] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Update file data
  const handleFileChange = (e) => {
    setBanner(e.target.files[0]);
  };

  // Function responsible for submiting the form, after validating description and tripname attributes.
  const handleCreateTrip = async () => {

    const isValid = validateDescription(description) & validateTripName(tripName);

    if(!isValid){
      if(language != 'pt'){  
        setSubmitError('Please correct the errors before submitting.');
        return;
      }
      setSubmitError('Por favor corrija os erros antes de submeter.');
      return;
    }

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
      await CreateTrip(storedUser.id, formData).then((status) => {  
        setAlert({
          show: true,
          message:
            language !== 'pt'
              ? 'Trip created successfully'
              : 'Viagem criada com sucesso',
          variant: 'success'
        });
        onHide();
      });

    } catch (error) {
      console.error('Error in CreateTrip call:', error);
    }

  };


  // Validating Functions
  // validateDescription - Description as to be greater or equal then 100 characters and less or equal then 300 characters.
  // validateTripName - Trip Name as to be greater or equal then 15 characters and less or equal then 45 characters.
  const validateDescription = (description) => {
    description = description.trim();
    const length = description.length;
    if(length < 100){
      if(language != 'pt'){
        setDescriptionError("Please insert a description with at least 100 characters.")
      }else{
        setDescriptionError("Por favor insira uma descrição com pelo menos 100 caracteres.")
      }
      return false;
    }

    if(length > 300){
      if(language != 'pt'){
        setDescriptionError("Please insert a description with no more then 300 characters.")
      }else{
        setDescriptionError("Por favor insira uma descrição com menos de 300 caracteres.")
      }
      return false;
    }

    return true;
}

  const validateTripName = (tripNameValidator) => {
    tripNameValidator = tripNameValidator.trim();
    const length = tripNameValidator.length;

    if(length < 15){
      if(language != 'pt'){
        setNameError("Please insert a trip name with at least 15 characters.")
      }else{
        setNameError("Por favor insira um nome com pelo menos 15 caracteres.")
      }
      return false;
    }

    if(length > 45){
      if(language != 'pt'){
        setNameError("Please insert a trip name with no more then 45 characters.")
      }else{
        setNameError("Por favor insira um nome com menos de 45 caracteres.")
      }
      return false;
    }

    return true;
  }

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
          <div className="text-danger">{nameError}</div>
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
          <div className="text-danger">{descriptionError}</div>
          <Form.Group controlId="location">
            <Form.Label>{Location}</Form.Label>
            <Form.Control
              as="select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">{LocationPlace}</option>
              {countries.map((country) => (
                <option key={country.id} value={country.name}>{country.name}</option>
              ))}
            </Form.Control>
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
          <div className="text-danger">{submitError}</div>
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
