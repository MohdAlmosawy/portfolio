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
import OdooPage from './components/OdooPage/OdooPage';
import PlayMyPath from './components/PlayMyPath/PlayMyPath';

function AppContent() {
  const [showSplash, setShowSplash] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show splash on homepage UNLESS we came from another page
    if (location.pathname === '/' && !location.state?.navigated) {
      setShowSplash(true);
    } else {
      setShowSplash(false);
    }
  }, [location]);

  // Clear the navigation state after the location change is complete
  useEffect(() => {
    if (location.state?.navigated) {
      window.history.replaceState({}, document.title);
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
          <Route path="/odooer" element={<OdooPage />} />
          <Route path="/play" element={<PlayMyPath />} />
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
