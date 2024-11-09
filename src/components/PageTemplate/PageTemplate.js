// src/components/PageTemplate/PageTemplate.js
import React from 'react';
import NavButtons from '../NavButtons/NavButtons';
import './PageTemplate.css';

const PageTemplate = ({ children }) => {
  return (
    <div className="page-template">
      <main className="page-content">
        {children}
        <div className="nav-container">
          <NavButtons showHomeButton={true} centered={true} />
        </div>
      </main>
    </div>
  );
};

export default PageTemplate;
