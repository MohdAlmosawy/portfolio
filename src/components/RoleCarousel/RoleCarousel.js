import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { roles } from '../../data/roles';
import './RoleCarousel.css';

const RoleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRoleClick = (path) => {
    navigate(path, { state: { navigated: true } });
  };

  const currentRole = roles[currentIndex];
  const IconComponent = LucideIcons[currentRole.icon];

  return (
    <div className="role-carousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="role-content"
          onClick={() => handleRoleClick(currentRole.path)}
        >
          <div className="role-header">
            {IconComponent && <IconComponent className="role-icon" />}
            <h2 className="role-title">{currentRole.title}</h2>
          </div>
          <p className="role-description">{currentRole.description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RoleCarousel; 