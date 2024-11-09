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
        {/* Desktop Navigation */}
        <div className="hidden md:block w-full">
          <NavButtons showHomeButton={true} centered={true} />
        </div>

        {/* Mobile Navigation */}
        <div className="block md:hidden w-full">
          {/* Burger Menu Button - Increased z-index */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-gray-800 text-white z-50 float-right relative"
            style={{ zIndex: 60 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="fixed top-0 right-0 h-screen w-64 bg-gray-900"
                style={{ zIndex: 50 }}
              >
                <div className="pt-16 px-4">
                  <NavButtons showHomeButton={true} centered={true} isMobile={true} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="page-content">
        {children}
      </main>
    </div>
  );
};

export default PageTemplate;
