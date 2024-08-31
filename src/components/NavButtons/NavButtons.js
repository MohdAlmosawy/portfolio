import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavButtons.css';

const NavButtons = ({ showHomeButton, centered }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, { state: { fromNavigation: true } });
  };

  return (
    <div className={`navigation-buttons ${centered ? 'centered' : ''}`}>
      {showHomeButton && (
        <button onClick={() => handleNavigation('/')}>Home</button>
      )}
      <button onClick={() => handleNavigation('/coming-soon')}>Play My Path</button>
      <button onClick={() => handleNavigation('/coming-soon')}>Motion-er</button>
      <button onClick={() => handleNavigation('/coming-soon')}>Backend-er</button>
      <button onClick={() => handleNavigation('/coming-soon')}>Odoo-er</button>
      <button onClick={() => handleNavigation('/coming-soon')}>DevOps-er</button>
      <button onClick={() => handleNavigation('/sysadminer')}>SysAdmin-er</button>
      <button onClick={() => handleNavigation('/coming-soon')}>Live My Journey</button>
    </div>
  );
};

export default NavButtons;
