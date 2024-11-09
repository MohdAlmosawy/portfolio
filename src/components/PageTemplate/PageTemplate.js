// src/components/PageTemplate/PageTemplate.js
import React, { useState } from 'react';
import NavButtons from '../NavButtons/NavButtons';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageTemplate.css';

const PageTemplate = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="page-template">
      {/* Burger Menu Button - Only visible on mobile */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800 text-white md:hidden"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Menu - Responsive */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 h-screen w-64 bg-gray-900 z-40 md:hidden"
          >
            <div className="pt-16 px-4">
              <NavButtons showHomeButton={true} centered={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="page-content">
        {children}
        {/* Navigation buttons - Only visible on desktop */}
        <div className="nav-container hidden md:block">
          <NavButtons showHomeButton={true} centered={true} />
        </div>
      </main>
    </div>
  );
};

export default PageTemplate;
