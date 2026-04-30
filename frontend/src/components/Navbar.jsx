import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, PlusCircle, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-brand" style={{ fontFamily: '"Georgia", serif', fontSize: '2rem', letterSpacing: '1px', fontStyle: 'italic', background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Home color="var(--primary-color)" size={32} /> StayNest
        </Link>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/properties" className="nav-link" onClick={() => setIsMenuOpen(false)}>Explore</Link>
          
          {token ? (
            <>
              <Link to="/add-property" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <PlusCircle size={18} /> Add Listing
                </span>
              </Link>
              <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <User size={18} /> Profile
                </span>
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '4px'}}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{padding: '0.5rem 1.5rem'}} onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
