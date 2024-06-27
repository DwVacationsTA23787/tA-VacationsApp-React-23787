import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
              <Route path="/" element={ <HomePage></HomePage>} />
              <Route path="/Login" element={ <Login></Login>} />
              <Route path="/Registo" element={ <Register></Register>} />
      </Routes>
    </>
  );
}

export default App;
