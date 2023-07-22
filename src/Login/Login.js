import React, { useState,useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import useFetch from '../Hooks/useFetch';
import LoadingSpinner from '../models/LoadingSpinner';
import ErrorOverlay from '../models/ErrorOverlay';
import { AuthContext } from '../models/AuthContext';


export default function Login(props) {
  //useState Variables
  const [authMode, setAuthMode] = useState('signin');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  //Hook imports
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest, isLoading, error, onCloseError } = useFetch();

  useEffect(()=>{

    if(auth.isLoggedIn){
      navigate('/');
    }
  },[])
  
  const changeAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(password);
  };

  const handleLoginSubmit = async (e) => {

    e.preventDefault();
    validateEmail(email);
    validatePassword(password);

    // Login submission here
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL+'/users/login',
        'POST',
        JSON.stringify({
          email: email,
          password: password
        }),
        {
          'Content-Type': 'application/json',
        }

      );
      console.log(responseData.message);
      auth.login(responseData.user.id,responseData.token);
      navigate('/');
    } catch (error) {
      console.log(error.message || 'An error occurred during login');
    }
  };


  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    console.log(fullName);
    // Signup Submission here
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL+'/users/signup',
        'POST',
        JSON.stringify({
          name: fullName,
          DOB: dateOfBirth,
          email: email,
          password: password
        }),
        {
          'Content-Type': 'application/json',
        }

      );
      console.log(responseData.message);
      auth.login(responseData.user.id, responseData.token);
      navigate('/');
    } catch (error) {
      console.log(error.message || 'An error occurred during Signup');
    }
  };

  const validateEmail = (email) => {
    if (email.length <= 6) {
      setEmailError('Too short');
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setEmailError('Missing or invalid Character');
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password) => {
    if (
      !password.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*./])(?=.{8,32})/)
    ) {
      setPasswordError(
        'Atleast One number , special character,  uppercase letter'
      );
    } else {
      setPasswordError('');
      return true;
    }
  };
  if (authMode === 'signin') {
    return (
      <div className='main-container'>


        <div className="Auth-form-container">
          {error && <ErrorOverlay error={error.message} onCloseError={onCloseError} />}
          {isLoading && <LoadingSpinner asOverlay />}
          <form className="Auth-form" onSubmit={handleLoginSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{' '}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>

              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <p className="error">{emailError}</p>

              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <p className="error">{passwordError}</p>
              </div>
              <div className="d-grid gap-2 mt-4">
                <button type="submit" onClick={handleLoginSubmit} className="btn btn-primary">
                  Submit
                </button>
              </div>
             
            </div>
          </form>
        </div>

      </div>
    );
  }

  return (
    <div className='main-container'>
      <div className="Auth-form-container">
        {error && <ErrorOverlay error={error.message} onCloseError={onCloseError} />}
        {isLoading && <LoadingSpinner asOverlay />}
        <form className="Auth-form" onSubmit={handleSignUpSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{' '}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                value={fullName}
                onChange={handleFullNameChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control mt-1"
                placeholder="Enter Your Date of Birth"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
              />
            </div>
            <div className="form-group mt-2">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
              <p className="error">{emailError}</p>

            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className="error">{passwordError}</p>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" onClick={handleSignUpSubmit} className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
