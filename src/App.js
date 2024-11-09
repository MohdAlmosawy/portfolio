// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import SplashScreen from './components/SplashScreen/SplashScreen';
import HomePage from './components/HomePage/HomePage';
import ComingSoon from './components/ComingSoon/ComingSoon';
import TerminalPage from './components/TerminalPage/TerminalPage';
import SysAdminPage from './components/SysAdminPage/SysAdminPage';
import DevOpsPage from './components/DevOpsPage/DevOpsPage';

function AppContent() {
  const [showSplash, setShowSplash] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show splash on homepage unless we navigated from another page
    if (location.pathname === '/' && !location.state?.fromNavigation) {
      setShowSplash(true);
    } else {
      setShowSplash(false);
    }
  }, [location]);

  const handleTransitionEnd = () => {
    setShowSplash(false);
  };

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen onTransitionEnd={handleTransitionEnd} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/terminal-test" element={<TerminalPage />} />
          <Route path="/sysadminer" element={<SysAdminPage />} />
          <Route path="/devopser" element={<DevOpsPage />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
