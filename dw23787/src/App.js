import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ShowTravelPage from './Pages/ShowTravelPage';
import TravelDetail from './Pages/TravelDetail';
import { handleLogin as userServiceLogin } from './Services/UserService';
import UserTravels from './Pages/UserTravels';
import DashboardPage from './Pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage on initial load
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    if (storedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (email, password, remainder) => {
    userServiceLogin(email, password, remainder)
      .then((response) => {
        const user = response;
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  const userId = user ? user.id : null;

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} id={userId} />
      <Routes>
        <Route path="/" element={!isLoggedIn ? <HomePage /> : <ShowTravelPage />} />
        <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/Registo" element={<Register />} />
        <Route path="/traveldetail/:id" element={<TravelDetail />} />
        <Route path="/UserTravels/:id" element={<UserTravels />} />
        <Route path="/Profile/:id" element={<DashboardPage/>}/>
      </Routes>
    </>
  );
}

export default App;
