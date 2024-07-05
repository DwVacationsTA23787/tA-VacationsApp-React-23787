import React, { useEffect, useState } from 'react';
import './Saudation.css';

function Saudation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (userLocal) {
      setUser(userLocal);
    }
  }, []);

  return (
    <div className='row'>
      {user ? (
        <>
          <p className='saudation-text'>
            Hi, {user.name}
          </p>
          <p className='saudation-subtext'>Let's search for a new travel!</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Saudation;
