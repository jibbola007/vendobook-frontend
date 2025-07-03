import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `nav-link ${location.pathname === path ? 'active' : ''}`;

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>

      <nav className="navbar-center">
        <Link to="/" className={linkClasses('/')}>Home</Link>
        <Link to="/add" className={linkClasses('/add')}>Add Expense</Link>
        <Link to="/history" className={linkClasses('/history')}>History</Link>
        <Link to="/summary" className={linkClasses('/summary')}>Summary</Link>
      </nav>

      
    </header>
  );
};

export default Navbar;