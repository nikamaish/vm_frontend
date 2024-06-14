// Signout.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../../Layout';
import Swal from 'sweetalert2';
import { useAuth } from '../../AuthContext';


const Signout = () => {
  const { signOut } = useAuth();
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    const handleSignout = async () => {
      try {
        await signOut();
        localStorage.removeItem('jwtToken'); // Remove JWT token from localStorage
        Swal.fire({
          title: 'Logged out successfully!',
          text: 'You have been successfully logged out.',
          icon: 'success'
        });
        setRedirectToHome(true);
      } catch (error) {
        console.error('Signout failed:', error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Signout failed. Please try again later.',
          icon: 'error'
        });
      }
    };

    handleSignout();
  }, [signOut]);

  return (
    <div>
      <div className='wrapper'>
        <div className='box'>
          <div className='container1'>
            <p>Logging out...</p>
          </div>
        </div>
      </div>
      {redirectToHome && <Navigate to="/" />}
      </div> 
  );
}

export default Signout;
