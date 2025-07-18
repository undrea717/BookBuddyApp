import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Book Buddy App!</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/reading-list">Reading List</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
