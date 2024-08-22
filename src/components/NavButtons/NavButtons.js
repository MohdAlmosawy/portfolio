// src/components/NavButtons/NavButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavButtons.css';

const NavButtons = ({ showHomeButton }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/coming-soon', { state: { fromNavigation: true } });
  };

  return (
    <div className="navigation-buttons">
      {showHomeButton && (
        <button onClick={() => navigate('/')} className="nav-button home-button">Home</button>
      )}
      <button onClick={handleNavigation} className="nav-button">Play My Path</button>
      <button onClick={handleNavigation} className="nav-button">Motion-er</button>
      <button onClick={handleNavigation} className="nav-button">Backend-er</button>
      <button onClick={handleNavigation} className="nav-button">Odoo-er</button>
      <button onClick={handleNavigation} className="nav-button">DevOps-er</button>
      <button onClick={handleNavigation} className="nav-button">SysAdmin-er</button>
      <button onClick={handleNavigation} className="nav-button">Live My Journey</button>
    </div>
  );
};

export default NavButtons;
