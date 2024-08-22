// src/HomePage.js
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';

const roles = [
  "Motion Designer",
  "Backend Developer",
  "Odoo Techno-Functional",
  "DevOps Engineer",
  "System Administrator",
  "Full Stack Developer",
  "Odoo Developer",
  "Project Manager",
  "ERP System Integrator",
  "Creative Director",
  "Technical Support Specialist",
];

const HomePage = () => {
  const [currentRole, setCurrentRole] = useState("");
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (isInitial) {
      // Show blank for the first 1 seconds
      const initialTimeout = setTimeout(() => {
        setIsInitial(false);
        setCurrentRole(0);
      }, 1000); // 1 seconds blank before starting the roles loop

      return () => clearTimeout(initialTimeout); // Clean up on component unmount
    } else {
      // Start looping through roles
      const interval = setInterval(() => {
        setCurrentRole(prevRole => (prevRole + 1) % roles.length);
      }, 800); // Change every 0.8 seconds

      return () => clearInterval(interval); // Clean up on component unmount
    }
  }, [isInitial]);

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <h2>Hi, This is Sayed Mohamed Ebrahim</h2>
      </header>

      {/* Main Greeting */}
      <div className="main-greeting">
        <h1 className="main-title">
          Hello World!
        </h1>
        <p className="role-description">
          I’m a <span className="highlight-yellow">{isInitial ? "" : roles[currentRole]}</span><br />
          Jack of all trades, master of MANY
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <a href="#play-my-path">Play My Path</a>
        <a href="#motioner">Motion-er</a>
        <a href="#backend-er">Backend-er</a>
        <a href="#odooer">Odoo-er</a>
        <a href="#devopser">DevOps-er</a>
        <a href="#sysadminer">SysAdmin-er</a>
        <a href="#live-my-journey">Live My Journey</a>
      </div>

      {/* Footer */}
      <footer className="footer-icons">
        <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="icon-link">
          <FaGithub />
          <span className="tooltip">Github</span>
        </a>
        <a href="your-cv-link" target="_blank" rel="noopener noreferrer" className="icon-link">
          <FaDownload />
          <span className="tooltip">Download CV</span>
        </a>
        <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="icon-link">
          <FaLinkedin />
          <span className="tooltip">LinkedIn</span>
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
