// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem('jwtToken', userData.access_token);
  };

  const signUp = (userData) => {
    setUser(userData);
    localStorage.setItem('jwtToken', userData.access_token);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('jwtToken');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setUser({ access_token: token });
        } else {
          // If the token has expired, perform sign-out
          signOut();
          // Redirect to the home page only if not already on the home page
          if (window.location.pathname !== '/') {
            window.location.href = '/';
          }
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // If there's an error during decoding, treat it as an invalid token and perform sign-out
        signOut();
        // Redirect to the home page only if not already on the home page
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }
    } else {
      // If there's no token, perform sign-out and redirect to the home page only if not already on the home page
      signOut();
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  const value = {
    user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
