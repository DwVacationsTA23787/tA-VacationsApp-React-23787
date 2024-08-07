import React, { useEffect, useState } from 'react'
import { GetAllTravelsForUser } from '../Services/TravelsService';
import TravelCard from '../Components/TravelCard';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../Components/NotFoundPage';
import { useAppContext } from '../Components/AppContext';
import { TravelsForUsersphrases } from '../Utils/language';

function UserTravels() {

  // useState Variables
  const { language } = useAppContext();
  const {
    HI,
    search,
  } = TravelsForUsersphrases[language];

    const [travelCards, setTravelCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData ] = useState(null);
    const { id } = useParams();


    // UseEffect - lifeCycle function.
    // starts the loader
    // will fetch all trips for specific user id.
    // Finally, if the answer is positive, insert it into the array. otherwise, insert empty and close the loader.
    useEffect(() => {
        setLoading(true);
        GetAllTravelsForUser(id)
          .then((data) => {
            setTravelCards(data.trips || []);
            setUserData(data.user)
          })
          .catch((error) => {
            setTravelCards([]);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

  // Render the component normally in case travelCards.length > 0, if not loads not found component.
  return (
    <div className='container mt-4 d-flex flex-column min-vh-100' style={{ backgroundColor: '#f8f9fa' }}>
        <p className='saudation-text'>
            {HI} {userData === null ? "" : userData.name}
          </p>
          <p className='saudation-subtext'>{search}</p>
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
