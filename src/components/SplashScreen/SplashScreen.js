// src/SplashScreen.js
import React, { useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
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
  "Olá",
];

const intervalDuration = 400; // Duration for each greeting
const animationSettings = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: "easeInOut" } // Faster transition
};

const SplashScreen = ({ onTransitionEnd }) => {
  const [index, setIndex] = useState(0);

  const handleTransitionEnd = useCallback(() => {
    onTransitionEnd();
  }, [onTransitionEnd]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % greetings.length);
    }, intervalDuration);

    // Clear the interval and trigger transition end after all greetings are shown
    const transitionTimer = setTimeout(() => {
      clearInterval(timer);
      handleTransitionEnd();
    }, intervalDuration * greetings.length);

    return () => {
      clearInterval(timer);
      clearTimeout(transitionTimer);
    };
  }, [handleTransitionEnd]);

  return (
    <div className="splash-screen">
      <motion.div
        key={index}
        initial={animationSettings.initial}
        animate={animationSettings.animate}
        exit={animationSettings.exit}
        transition={animationSettings.transition}
        className="welcome-message"
      >
        <h1>{greetings[index]}</h1>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
