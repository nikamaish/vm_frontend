import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons'; // Import the sign out and menu icons
import { useAuth } from '../../AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-logo" to="/"><img src="./icons/logo.jpeg"  style={{width:'100px', height:'auto'}} alt="img" /></Link>
        </div>
        <div className="navbar-menu">
          <button className="menu-button" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} size='2x'/>
          </button>
          <ul className={`navbar-items ${showMenu ? 'active' : ''}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <li>
                <Link to="/CryptoOneDay">Dashboard</Link>
              </li>
            )}
            {!user && (
              <li>
                <Link to="/alert">Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/ai">Chankya AI</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {user ? (
              <li>
                 <Link to="/signout">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/signup">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;