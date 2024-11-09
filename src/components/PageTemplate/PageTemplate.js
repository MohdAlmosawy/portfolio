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
      <header className="page-header">
        {/* Desktop Navigation - Centered */}
        <div className="nav-wrapper hidden md:block w-full">
          <NavButtons showHomeButton={true} centered={true} />
        </div>

        {/* Burger Menu Button - Positioned absolutely */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-gray-800 text-white z-50"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
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
      </header>

      <main className="page-content">
        {children}
      </main>
    </div>
  );
};

export default PageTemplate;
