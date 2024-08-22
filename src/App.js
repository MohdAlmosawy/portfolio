// src/App.js
import React, { useState } from 'react';
import SplashScreen from './SplashScreen';
import HomePage from './HomePage';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Handle transition end
  const handleTransitionEnd = () => {
    setShowSplash(false);
  };

  return (
    <div className="App">
      {showSplash ? <SplashScreen onTransitionEnd={handleTransitionEnd} /> : <HomePage />}
    </div>
  );
}

export default App;
