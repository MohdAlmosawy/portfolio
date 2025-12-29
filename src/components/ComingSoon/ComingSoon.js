import React from 'react';
import PageTemplate from '../PageTemplate/PageTemplate'; // Import PageTemplate
import './ComingSoon.css'; // Custom styles for Coming Soon

const ComingSoon = () => {
  return (
    <PageTemplate>
      <div className="coming-soon">
        <h1>Coming Soon!</h1>
        <p>Stay tuned for updates.</p>
      </div>
    </PageTemplate>
  );
};

export default ComingSoon;
