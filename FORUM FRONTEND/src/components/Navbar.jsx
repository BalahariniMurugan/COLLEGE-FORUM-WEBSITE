import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; 
import logo from './clg.webp';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="SKCT Logo" className="logo-image" />
          <div className="logo-text">
            <span>Sri Krishna College of Technology</span><br />
            <small>An Autonomous Institution | Accredited by NAAC with 'A' Grade</small>
          </div>
        </Link>
        <ul className="navbar-links">
          <li className="navbar-item"><Link to="/" className="no-underline">Home</Link></li>
          {!currentUser && (
            <>
              <li className="navbar-item"><Link to="/login" className="no-underline">Login</Link></li>
              <li className="navbar-item"><Link to="/admin" className="no-underline">Admin</Link></li>
            </>
          )}
          {currentUser && (
            <>
              <li className="navbar-item"><Link to="/dashboard" className="no-underline">{currentUser.name || currentUser.email}</Link></li>
              <li className="navbar-item"><button onClick={handleLogout} className="no-underline">Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
