import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ handleLogin }) { // Receive handleLogin as prop

  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [remainder, setRemainder] = useState(false);

  const handleCheckboxChange = (event) => {
    setRemainder(event.target.checked);
  };

  const handleSubmit = () => {
    handleLogin(Email, Password, remainder); // Call handleLogin from props
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
                    onChange={(event) => setEmail(event.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form2Example18">Email address</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    value={Password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form2Example28">Password</label>
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
