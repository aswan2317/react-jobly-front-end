// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({currentUser,logout}) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/jobs">Jobs</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default NavBar;
