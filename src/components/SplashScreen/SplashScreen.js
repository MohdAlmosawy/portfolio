// src/SplashScreen.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

const greetings = [
  "Hi",
  "السلام عليكم",
  "欢迎",
  "Bienvenue",
  "أهلاً وسهلاً",
  "Welcome",
  "Ciao",
  "Hola",
  "يا مرحبا",
  "Привет",
  "안녕하세요",
  "Olá"
];

const SplashScreen = ({ onTransitionEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % greetings.length);
    }, 500);

    const transitionTimer = setTimeout(() => {
      clearInterval(timer);
      onTransitionEnd();
    }, 500 * greetings.length);

    return () => {
      clearInterval(timer);
      clearTimeout(transitionTimer);
    };
  }, [onTransitionEnd]);

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="content-wrapper">
        <div className="blob-container">
          <motion.div
            className="blob blob-blue"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="blob blob-purple"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="blob blob-indigo"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="greeting-container"
          >
            <h1>{greetings[currentIndex]}</h1>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
