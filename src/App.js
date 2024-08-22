// src/App.js
import React, { useState } from 'react';
import './App.css';

// Updated import paths
import SplashScreen from './components/SplashScreen/SplashScreen';
import HomePage from './components/HomePage/HomePage';
import ComingSoon from './components/ComingSoon/ComingSoon';

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
