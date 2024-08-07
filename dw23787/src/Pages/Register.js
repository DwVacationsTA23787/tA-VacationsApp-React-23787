import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { handleRegister } from '../Services/UserService';
import { useAppContext } from '../Components/AppContext';
import { Registerhrases } from '../Utils/language';
import { countries } from '../Utils/countrys';
import { Alert } from 'react-bootstrap';

function Register() {

  // App context variables for language conversion.
  const { language } = useAppContext();
  const {
    Name,
        Email,
        passwordR,
        SignUp,
        passwordRR,
        Birthdate,
        Nationality,
        Quote,
        Gender,
        ProfilePicture,
        Phone,
        Terms,
        Service,
        Register,
        Login,
        LoginH
  } = Registerhrases[language];


  // UseStates
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [quote, setQuote] = useState('');
  const [nationality, setNationality] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });




  // Error States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [quoteError, setQuoteError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [submitError, setSubmitError] = useState('');


  // Handle Events functions
  // handleSubmit - This function will treat the submition form and validate it displaying error messages if its necessary.
  // handleFileChange - Gets the file information to be added in the form on handlesubmit.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      if(language !== 'pt'){
        setPasswordError("Passwords don't match");
        return;
      }
      setPasswordError("Palavras-passe não coincidem");
      return;
    }

    const isValid = validateEmail(email) & validatePassword(password) & validateQuote(quote) & validateGender(gender) & validateBirthdate(birthdate);
    
    if (!isValid) {
      if(language !== 'pt'){  
        setSubmitError('Please correct the errors before submitting.');
        return;
      }
      setSubmitError('Por favor corrija os erros antes de submeter.');
      return;
    }

    const formData = new FormData();

    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('password', password);
    formData.append('dataNascimento', birthdate);
    formData.append('age', 0);
    formData.append('gender', gender);
    formData.append('phone', phone);
    formData.append('Nationality', nationality);
    formData.append('phone', phone);
    formData.append('UserID', 'd43');
    formData.append('Quote', quote);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      await handleRegister(formData);
      setAlert({
        show: true,
        message: language !== 'pt' ? 'Please verify your email' : 'Por favor verifique o seu email',
        variant: 'success'
      });
      
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };


  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };


  // validation Functions
  // validateEmail - regex ensures that is an email, and gives the corresponding error in case of failing.
  // validatePassword - regex ensusres that password be 6-20 characters, contain at least one digit, one lowercase and one uppercase letter
  // validateQuote - the quote as to be between 10 and 250 characters length.
  // validateGender - as to be one of this ['male', 'female', 'non-binary', 'other', 'masculino', 'feminino', 'não-binário', 'outro']
  // validateBirthdate - as to be at least 16 years old.
  const validateEmail = (email) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email === "") {
      if(language !== 'pt'){
        setEmailError('Email is required');
        return false;
      }
      setEmailError('Email é necessario');
      return false;
    } else if (!re.test(email)) {
      if(language !== 'pt'){
        setEmailError('Enter a valid email address');
        return false;
      }
      setEmailError('Introduza um email valido');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password === "") {
      if(language !== "pt"){
        setPasswordError('Password is required');
        return false;
      }
      setPasswordError('Password é necessária');
      return false;
    } else if (!re.test(password)) {
      if(language !== "pt"){
        setPasswordError('Password must be 6-20 characters, contain at least one digit, one lowercase and one uppercase letter');
        return false;
      }
      setPasswordError('Password tem de ter 6-20 caracteres, conter pelo menos um dígito, uma letra minúscula e uma maiúscula');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validateQuote = (quote) => {
    if (quote.length < 10 || quote.length > 250) {
      if(language !== 'pt'){
        setQuoteError('Quote must be between 10 and 250 characters');
        return false;
      }
      setQuoteError('Frase tem de conter entre 10 a 250 caracteres');
      return false;
    } else {
      setQuoteError('');
      return true;
    }
  };

  const validateGender = (gender) => {
    const validGenders = ['male', 'female', 'non-binary', 'other', 'masculino', 'feminino', 'não-binário', 'outro'];
    if (!validGenders.includes(gender.toLowerCase())) {
      if(language !== 'pt'){
        setGenderError('Gender must be male, female, non-binary, or other');
        return false;
      }
      setGenderError('Género tem de ser masculino, feminino, não-binário, ou outro');
      return false;
    } else {
      setGenderError('');
      return true;
    }
  };

const validateBirthdate = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();

  // Have at least 16 years
  const sixteenYearsAgo = new Date();
  sixteenYearsAgo.setFullYear(today.getFullYear() - 16);

  if (birthDate >= today) {
    if(language !== 'pt'){
      setBirthdateError('Birthdate cannot be today or in the future');
      return false;
    }
    setBirthdateError('Data de nascimento não pode ser a data atual ou do futuro');
    return false;
  } else if (birthDate > sixteenYearsAgo) {
    if(language !== 'pt'){
      setBirthdateError('You must be at least 16 years old');
      return false;
    }
    setBirthdateError('Tem de ter pelo menos 16 anos.');
    return false;
  } else {
    setBirthdateError('');
    return true;
  }
};

  // The alert message here is to inform the email confirmation step.
  return (
    <section className="vh-100">
       {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }} onSubmit={handleSubmit}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>{SignUp}</h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example1c"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example1c">{Name}</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3c"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example3c">{Email}</label>
                  <div className="text-danger">{emailError}</div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example4c"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example4c">{passwordR}</label>
                  <div className="text-danger">{passwordError}</div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example4cd"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example4cd">{passwordRR}</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="date"
                    id="form3Example4cf"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example4cf">{Birthdate}</label>
                  <div className="text-danger">{birthdateError}</div>
                </div>

                <div className="form-outline mb-4">
                  <select
                    id="form3Example3c"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="form-control form-control-lg"
                  >
                    <option value="">{nationality}</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="form3Example3c">{Nationality}</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3c"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example3c">{Quote}</label>
                  <div className="text-danger">{quoteError}</div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example4ck"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example4cd">{Gender}</label>
                  <div className="text-danger">{genderError}</div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    id="form3Example4cre"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form3Example4cd">{ProfilePicture}</label>
                </div>

                <div className="form-outline mb-4">
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                  />
                  <label className="form-label" htmlFor="form3Example4cd">{Phone}</label>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    id="form1Example3"
                  />
                  <label className="form-check-label" htmlFor="form1Example3"> {Terms} <a href="#!">{Service}</a> </label>
                </div>

                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">{Register}</button>
                  <div className="text-danger">{submitError}</div>
                </div>

                <p>{Login} <Link to="/Login" className="link-info">{LoginH}</Link></p>
              </form>
            </div>
          </div>

          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src="/adventure.jpg" alt="Register" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
