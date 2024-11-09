import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import './NavButtons.css';

const buttonConfig = [
  {
    path: '/play',
    label: 'Play My Path',
    icon: 'Gamepad2'
  },
  {
    path: '/coming-soon',
    label: 'Motion-er',
    icon: 'Video'
  },
  {
    path: '/coming-soon',
    label: 'Backend-er',
    icon: 'Server'
  },
  {
    path: '/coming-soon',
    label: 'Odoo-er',
    icon: 'Briefcase'
  },
  {
    path: '/devopser',
    label: 'DevOps-er',
    icon: 'GitBranch'
  },
  {
    path: '/sysadminer',
    label: 'SysAdmin-er',
    icon: 'Terminal'
  },
  {
    path: '/coming-soon',
    label: 'Live My Journey',
    icon: 'Map'
  }
];

const NavButtons = ({ showHomeButton, centered, isMobile }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, { state: { navigated: true } });
  };

  const finalButtonConfig = showHomeButton 
    ? [{ path: '/', label: 'Home', icon: 'Home' }, ...buttonConfig]
    : buttonConfig;

  return (
    <div className={`navigation-buttons ${centered ? 'centered' : ''} ${isMobile ? 'mobile' : ''}`}>
      {finalButtonConfig.map((button, index) => {
        const IconComponent = LucideIcons[button.icon];
        return (
          <motion.button
            key={index}
            onClick={() => handleNavigation(button.path)}
            className="nav-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {IconComponent && <IconComponent className="button-icon" />}
            <span>{button.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default NavButtons;
