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
import ChatPage from './Pages/ChatPage';
import { AppProvider } from './Components/AppContext'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [SubmitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
          setSubmitError('Failed to login. Please check your credentials and try again or verify your email');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  const userId = user ? user.id : null;

  return (
    <AppProvider>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} id={userId} />
      <Routes>
        <Route path="/" element={!isLoggedIn ? <HomePage /> : <ShowTravelPage />} />
        <Route path="/Login" element={<Login handleLogin={handleLogin} SubmitError={SubmitError} />} />
        <Route path="/Registo" element={<Register />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/traveldetail/:id" element={<TravelDetail />} />
        <Route path="/UserTravels/:id" element={<UserTravels />} />
        <Route path="/Profile/:id" element={<DashboardPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
