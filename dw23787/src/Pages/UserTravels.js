import React, { useEffect, useState } from 'react'
import { GetAllTravelsForUser } from '../Services/TravelsService';
import TravelCard from '../Components/TravelCard';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../Components/NotFoundPage';

function UserTravels() {

    const [travelCards, setTravelCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData ] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        GetAllTravelsForUser(id)
          .then((data) => {
            setTravelCards(data.trips.$values || []);
            setUserData(data.user)
          })
          .catch((error) => {
            setTravelCards([]);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

  return (
    <div className='container mt-4 d-flex flex-column min-vh-100' style={{ backgroundColor: '#f8f9fa' }}>
        <p className='saudation-text'>
            You are seeing travels created by, {userData === null ? "" : userData.name}
          </p>
          <p className='saudation-subtext'>Let's search for a new travel!</p>
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="travel-cards-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {travelCards.length > 0 ? (
            travelCards.map((travel) => (
              <div key={travel.id} style={{ flex: '1 0 200px', margin: '10px' }}>
                <TravelCard id={travel.id} image={travel.banner} title={travel.tripName} />
              </div>
            ))
          ) : (
            <NotFoundPage/>
            //<div>No travel cards available</div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserTravels
