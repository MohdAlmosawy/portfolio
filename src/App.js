// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import SplashScreen from './components/SplashScreen/SplashScreen';
import HomePage from './components/HomePage/HomePage';
import ComingSoon from './components/ComingSoon/ComingSoon';
import TerminalPage from './components/TerminalPage/TerminalPage';
import SysAdminPage from './components/SysAdminPage/SysAdminPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleTransitionEnd = () => {
    setShowSplash(false);
  };

  return (
    <Router>
      <div className="App">
        {showSplash ? (
          <SplashScreen onTransitionEnd={handleTransitionEnd} />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/terminal-test" element={<TerminalPage />} />
            <Route path="/sysadminer" element={<SysAdminPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
