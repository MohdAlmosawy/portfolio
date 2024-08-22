// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import SplashScreen from './components/SplashScreen/SplashScreen';
import HomePage from './components/HomePage/HomePage';
import ComingSoon from './components/ComingSoon/ComingSoon';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleTransitionEnd = () => {
    setShowSplash(false);
  };

  return (
    <Router basename="/portfolio"> {/* Set basename */}
      <div className="App">
        {showSplash ? (
          <SplashScreen onTransitionEnd={handleTransitionEnd} />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
