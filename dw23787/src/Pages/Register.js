import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {handleRegister} from '../Services/UserService';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [Quote, setQuote] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords don't match");
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password,
      dataNascimento: birthdate,
      age: 0,
      gender: gender,
      phone: phone,
      profilePicture: profilePicture,
      UserID: '',
      Quote: Quote
    };

    handleRegister(newUser);
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }} onSubmit={handleSubmit}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign up</h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example1c"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3c"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example4c"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example4c">Password</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example4cd"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="date"
                    id="form3Example4cf"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example4cd">Birthdate</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3c"
                    value={Quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example3c">Your Quote</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example4ck"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example4cd">Gender</label>
                </div>


                <div className="form-outline mb-4">
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone} />
                  <label className="form-label" htmlFor="form3Example4cd">Phone</label>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    id="form1Example3"
                  />
                  <label className="form-check-label" htmlFor="form1Example3">  I agree to all statements in <a href="#!">Terms of service</a> </label>
                </div>

                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">Register</button>
                </div>

                <p>Already have an account? <Link to="/Login" className="link-info">Login here</Link></p>
              </form>
            </div>
          </div>

          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src="/adventure.jpg" alt="Register image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
