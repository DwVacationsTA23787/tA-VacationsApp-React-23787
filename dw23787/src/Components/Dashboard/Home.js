import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import { GetUser, UpdateUser } from '../../Services/UserService';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { DashHomephrases } from '../../Utils/language';

function Home() {

// App context variables for language conversion.
// Image from server.
const { language, ImageDir } = useAppContext();
const {
  Profile,
  Email,
  Birth,
  Age,
  Gender,
  Phone,
  Quote,
  Edit,
  Save,
  NationalityF
} = DashHomephrases[language];

  // useParams variable to save id of URL param.
  const { id } = useParams();

  // UseState variables
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  // Formdata initialization, age is passed with value 0 because is calculated in the back-end.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dataNascimento: '',
    age: 0,
    gender: '',
    phone: '',
    quote: '',
    Nationality: ''
  });

  // Get user details to display in the card.
  useEffect(() => {
    GetUser(id).then((data) => {
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email,
        dataNascimento: data.dataNascimento,
        age: data.age,
        gender: data.gender,
        phone: data.phone,
        quote: data.quote,
        Nationality: data.nationality,
      });
    });
  }, [id]);

  // Edit function to change the form data
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to deal with the update
  const handleUpdate = async () => {
    try {
      await UpdateUser(id, formData);
      setUser({ ...user, ...formData });
      setEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h1>{Profile}</h1>
      {user ? (
        <Row>
          <Col md={4}>
            <Card>
              {user.profilePicture && (
              <Card.Img variant="top" src={user.profilePicture === null || user.profilePicture === "" ? "/profile.jpeg" : `${ImageDir}/${user.profilePicture}` } alt="Profile Picture" />
              )}
              <Card.Body>
                <Card.Title>
                  {editing ? (
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.name
                  )}
                </Card.Title>
                <Card.Text>
                  <strong>{Email}:</strong>{' '}
                  {editing ? (
                    <Form.Control
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.email
                  )}
                  <br />
                  <strong>{Birth}:</strong>{' '}
                  {editing ? (
                    <Form.Control
                      type="date"
                      name="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleInputChange}
                    />
                  ) : (
                    new Date(user.dataNascimento).toLocaleDateString()
                  )}
                  <br />
                  <strong>{Age}:</strong>{' '}
                  {editing ? (
                    <Form.Control
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.age
                  )}
                  <br />
                  <strong>{Gender}:</strong>{' '}
                  {editing ? (
                    <Form.Control
                      as="select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Control>
                  ) : (
                    user.gender
                  )}
                  <br />
                  <strong>{Phone}:</strong>{' '}
                  {editing ? (
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.phone
                  )}
                  <br />
                  <strong>{NationalityF}:</strong>{' '}
                  {editing ? (
                    <Form.Control
                      type="text"
                      name="Nationality"
                      value={formData.Nationality}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.nationality
                  )}
                  <br />
                  <strong>{Quote}:</strong>{' '}
                  {editing ? (
                    <Form.Control
                      type="text"
                      name="quote"
                      value={formData.quote}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.quote
                  )}
                </Card.Text>
                {editing ? (
                  <Button variant="primary" onClick={handleUpdate}>
                    {Save}
                  </Button>
                ) : (
                  <Button variant="info" onClick={() => setEditing(true)}>
                    {Edit}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
          {/* Additional columns for other information */}
        </Row>
      ) : (
        <p>Loading user profile...</p>
      )}
    </Container>
  );
}

export default Home;
