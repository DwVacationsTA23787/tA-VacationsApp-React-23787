// src/Components/Dashboard/Travels.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Pagination, Container, Alert } from 'react-bootstrap';
import { GetAllTripsForUser } from '../../Services/TravelsService';
import { useAppContext } from '../AppContext';
import { DashTripsphrases } from '../../Utils/language';
import { DeleteTrip } from '../../Services/TravelsService';
import TravelUpdate from './TravelComponent/TravelUpdate';

const Travels = () => {

  const { language, ImageDir } = useAppContext();
  const {
    Travels,
    Transport,
    BudgetI,
    BudgetF,
    Category,
    Location,
    Description,
    TripName,
    List,
    Banner,
    Delete,
    Update
  } = DashTripsphrases[language];

  const { id } = useParams();
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage] = useState(5);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);


  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (trip) => {
    setShowModal(false);
  };

  const handleUpdate = (tripId) => {
    const tripToUpdate = trips.find((trip) => trip.id === tripId);
    setSelectedTrip(tripToUpdate);
    setShowModal(true);
  };

  const updateTrip = (updatedTrip) => {
    const updatedTrips = trips.map((trip) =>
      trip.id === updatedTrip.id ? updatedTrip : trip
    );
    setTrips(updatedTrips);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    GetAllTripsForUser(id).then((data) => {
      setTrips(data);
    }).catch((error) => {
      console.error('Error fetching trips:', error);
    });
  }, [id]);

  const handleDelete = (tripId) => {
    DeleteTrip(tripId)
      .then((data) => {
        setAlert({
          show: true,
          message: language !== 'pt' ? 'Trip deleted successfully' : 'Viagem apagada com sucesso',
          variant: 'success'
        });
        setTrips(trips.filter(trip => trip.id !== tripId));
      })
      .catch((error) => {
        console.error('Error deleting trip:', error);
        if (error.response && error.response.status === 400) {
          setAlert({
            show: true,
            message: language !== 'pt' ? 'Delete Trip before deleting the corresponding group.' : 'Apague primeiro a viagem correspondente ao grupo associado.',
            variant: 'danger'
          });
        } else {
          setAlert({
            show: true,
            message: language !== 'pt' ? 'An unexpected error occurred.' : 'Ocorreu um erro inesperado.',
            variant: 'danger'
          });
        }
      });
  };


  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const userName = user && user.name ? user.name : "";
  const isAdmin = user && user.isAdmin ? user.isAdmin : false;

  return (
    <Container className="mt-4">
      {
        isAdmin == true ? <h1>{List} </h1> : <h1>{Travels} {userName}</h1>
      }
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>{TripName}</th>
            <th>{BudgetI}</th>
            <th>{BudgetF}</th>
            <th>{Description}</th>
            <th>{Transport}</th>
            <th>{Category}</th>
            <th>{Banner}</th>
            <th>{Location}</th>
            <th>{Update}</th>
            <th>{Delete}</th>
          </tr>
        </thead>
        <tbody>
          {currentTrips.map((trip, index) => (
            <tr key={trip.id}>
              <td>{indexOfFirstTrip + index + 1}</td>
              <td>{trip.tripName}</td>
              <td>{trip.inicialBudget}</td>
              <td>{trip.finalBudget}</td>
              <td>{trip.description}</td>
              <td>{trip.transport}</td>
              <td>{trip.category}</td>
              <td> <img style={{height: '50px', maxWidth: '150px'}} src={trip.banner === null || trip.banner === "" ? "/profile.jpeg" : `${ImageDir}/${trip.banner}`} alt="Travel Picture" /> </td>
              <td>{trip.location}</td>
              <td className='text-center'><button onClick={() => {handleUpdate(trip.id)}} type="button" class="btn btn-info">{Update}</button></td>
              <td className='text-center'><button onClick={() => {handleDelete(trip.id)}} type="button" class="btn btn-danger">{Delete}</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: Math.ceil(trips.length / tripsPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      {selectedTrip && (
  <TravelUpdate
    show={showModal}
    onHide={handleCloseModal}
    trip={selectedTrip}
    setAlert={setAlert}
    updateTrip={updateTrip}
  />
)}
    </Container>

  );
};

export default Travels;
