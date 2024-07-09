// Signup.js
import React, { useState } from 'react';
import './Signup.css';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Layout from '../../Layout';
import Swal from 'sweetalert2';
import { useAuth } from '../../AuthContext';
import Footer from '../../componentshome/Footer/Footer';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const { signUp } = useAuth();
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://vm-backend-bfk1.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data.message);

      if (response.ok) {
        Swal.fire({
          title: 'Good job!',
          text: 'You have successfully signed up!',
          icon: 'success',
        });
        signUp(data);
        setRedirectToHome(true);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="box1">
          <form className="left-container1" onSubmit={handelSubmit}>
            <div className="container1">
              <h2 className="heading">Sign Up</h2>
              <div className="inputText">
                <input value={username} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <span id="icon"><FontAwesomeIcon icon={faUser} /></span>
              </div>
              <div className="inputText">
                <input value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                <span id="icon1"><FontAwesomeIcon icon={faEnvelope} /></span>
              </div>
              <div className="inputText">
                <input value={password} type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                <span id="icon2"><FontAwesomeIcon icon={faEyeSlash} /></span>
              </div>
              <button className="btn" onClick={handelSubmit}>Sign Up</button>
            </div>
          </form>
          <section className="right-container1 gradient1">
            <h2 className="text1">Welcome Back !!!</h2>
            <p className="text">Already have an account?</p>
            <button className="btn"><Link className="btnText" to={'/signin'}>Sign In</Link></button>
          </section>
        </div>
      </div>
      {redirectToHome && <Navigate to="/cryptoOneday" />}

  <Footer/>
      </div>

  
  );
};

export default Signup;
