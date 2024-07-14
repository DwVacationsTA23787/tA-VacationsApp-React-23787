import React, { useEffect, useState } from 'react';
import Counters from '../Components/HomeComponents/Counters';
import HeroSection from '../Components/HomeComponents/HeroSection';
import {GetUsersCount, GetTripsCount} from '../Services/generalService';

function HomePage() {

  // UseState Variables
  const [numUsers, setNumUsers] = useState(0);
  const [numTrips, setNumTrips] = useState(0);

  // UseEffect - lifeCycle function.
  // grab counts of users and trips that are registered in the app to be displayed in the home page.
  useEffect(() => {
    const fetchUsersCount = async () => {
      const usersCount = await GetUsersCount();
      if (usersCount !== null) {
        setNumUsers(usersCount);
      }
    };

    const fetchTripsCount = async () => {
      const tripsCount = await GetTripsCount();
      if (tripsCount !== null) {
        setNumTrips(tripsCount);
      }
    };

    fetchUsersCount();
    fetchTripsCount();
  }, []);

  return (
    <div>
      <HeroSection></HeroSection>
      <div id="counters" className='container' style={{ zIndex: '10', position: 'relative', marginTop: '-50px', backgroundColor: 'white', borderRadius: '15px' }}>
        <Counters numUsers={numUsers} numTrips={numTrips} ></Counters>
        <div className='row'>
          <div className='col-12 d-flex justify-content-center'>
            <hr className='w-75'></hr>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage