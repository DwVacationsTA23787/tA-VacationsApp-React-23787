import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ handleLogin, SubmitError }) {

  // UseStates
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [remainder, setRemainder] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  // Handle Event Functions
  const handleCheckboxChange = (event) => {
    setRemainder(event.target.checked);
  };

  const handleSubmit = () => {
    if (validateEmail(Email) && validatePassword(Password)) {
      handleLogin(Email, Password, remainder);
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };


  // Validation Functions

  const validateEmail = (email) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email === "") {
      setEmailError('Email is required');
      return false;
    } else if (!re.test(email)) {
      setEmailError('Enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password === "") {
      setPasswordError('Password is required');
      return false;
    } else if (!re.test(password)) {
      setPasswordError('Password must be 6-20 characters, contain at least one digit, one lowercase and one uppercase letter');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example18"
                    value={Email}
                    onChange={handleEmail}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form2Example18">Email address</label>
                  <div className="text-danger">{emailError}</div>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    value={Password}
                    onChange={handlePassword}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form2Example28">Password</label>
                  <div className="text-danger">{passwordError}</div>
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={remainder}
                    onChange={handleCheckboxChange}
                    id="form1Example3"
                  />
                  <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                </div>
                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="button" onClick={handleSubmit}>Login</button>
                  <div className="text-danger mt-2">{SubmitError}</div>
                </div>
                <p>Don't have an account? <Link to="/Registo" className="link-info">Register here</Link></p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src="/Login.jpg"
              alt="Login image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
