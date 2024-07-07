// src/Components/Dashboard/Travels.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Pagination, Container } from 'react-bootstrap';
import { GetAllTripsForUser } from '../../Services/TravelsService';

const Travels = () => {
  const { id } = useParams();
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage] = useState(5);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    GetAllTripsForUser(id).then((data) => {
      console.log(data.$values)
      setTrips(data.$values);
    }).catch((error) => {
      console.error('Error fetching trips:', error);
    });
  }, [id]);


  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const userName = user && user.name ? user.name : "";

  return (
    <Container className="mt-4">
       <h1>Travels of {userName}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Intial Budget</th>
            <th>Final Budget</th>
            <th>Description</th>
            <th>Transport</th>
            <th>Category</th>
            <th>Banner</th>
          </tr>
        </thead>
        <tbody>
          {currentTrips.map((trip, index) => (
            <tr key={trip.id}>
              <td>{indexOfFirstTrip + index + 1}</td>
              <td>{trip.description}</td>
              <td>{trip.inicialBudget}</td>
              <td>{trip.finalBudget}</td>
              <td>{trip.description}</td>
              <td>{trip.transport}</td>
              <td>{trip.category}</td>
              <td>{trip.banner}</td>
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
    </Container>
  );
};

export default Travels;
