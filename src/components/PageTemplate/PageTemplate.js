// src/components/PageTemplate/PageTemplate.js
import React, { useState } from 'react';
import NavButtons from '../NavButtons/NavButtons';
import ComingSoon from '../ComingSoon/ComingSoon'; // Import the ComingSoon component
import './PageTemplate.css';

const PageTemplate = ({ children }) => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleButtonClick = () => {
    setShowComingSoon(true); // Set to true to display "Coming Soon"
  };

  return (
    <div className="page-template">
      <header className="page-header">
        <NavButtons showHomeButton={true} onButtonClick={handleButtonClick} />
      </header>

      <main className="page-content">
        {showComingSoon ? <ComingSoon /> : children}
      </main>
    </div>
  );
};

export default PageTemplate;
