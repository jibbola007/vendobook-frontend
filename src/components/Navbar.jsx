import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);


  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const linkClasses = (path) =>
    `nav-link ${location.pathname === path ? 'active' : ''}`;


  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>

      <nav className="navbar-center">
        <Link to="/" className={linkClasses('/')}>Home</Link>
        {user && (
          <>
            <Link to="/add" className={linkClasses('/add')}>Add Expense</Link>
            <Link to="/history" className={linkClasses('/history')}>History</Link>
            <Link to="/summary" className={linkClasses('/summary')}>Summary</Link>
          </>
        )}
      </nav>

      <div className="navbar-right">
        {/* 🍔 Hamburger icon */}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        {menuOpen && (
          <div className="dropdown-menu">
            <ThemeToggle />
            {user && (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;