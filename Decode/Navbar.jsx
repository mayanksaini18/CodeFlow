import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <i className="fas fa-code"></i> CodeFlow
      </NavLink>
      <ul className="navbar-nav">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
        {/* We can add a link to a dashboard later */}
      </ul>
    </nav>
  );
}

export default Navbar;