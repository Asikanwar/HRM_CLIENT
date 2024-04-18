import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    // Remove token from localStorage (assuming token is stored in localStorage)
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.href = '/login'; // Redirect to your login route
  };

  return (
    <nav id="navbar" className="custom-navbar">
      <div className="container">
        <ul className="navbar-list">
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#orders">Orders</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link to="/add-user">SIGN UP</Link></li>
          <li><Link to="/viewList">ViewList</Link></li>
          {/* Logout button */}
          <li className='butn'><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
