import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardAlert = () => {
  const { user } = useAuth();
    const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: 'Welcome!',
        text: 'Please do Sign up or Sign in to see Dashboard',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sign Up',
        cancelButtonText: 'Sign In',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle Sign Up logic here
          navigate('/signup');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Handle Sign In logic here
          navigate('/signin');
        }
      });
    }
  }, [user]);

  return (
    <div>
      {/* You can add additional content here if needed */}
    </div>
  );
};

export default DashboardAlert;