import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import ComingSoon from '../ComingSoon/ComingSoon'; // Import ComingSoon component
import NavButtons from '../NavButtons/NavButtons'; // Import the NavButtons component


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
  const [selectedSection, setSelectedSection] = useState(null); // State to track selected section

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

  // Handle button click to show Coming Soon
  const handleButtonClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="home-page">
      {selectedSection ? (
        <ComingSoon />
      ) : (
        <>
          {/* Header */}
          <header className="header">
            <p>It’s impossible to fit myself into just one box, so here, I’m introducing a few of the many.</p>
            <div className="inline-text"><h2>I’m Sayed Mohamed Ebrahim, </h2><p> &nbsp; and ... drumroll please 🥁 ...</p></div>
          </header>

          {/* Main Greeting */}
          <div className="main-greeting">
            <h1 className="main-title">
              Hello World!!
            </h1>
            <p className="role-description">
              I’m a <span className="highlight-yellow">{isInitial ? "" : roles[currentRole]}</span><br />
              Jack of all trades, master of MANY.
            </p>
          </div>


          <NavButtons onButtonClick={handleButtonClick} /> {/* Use NavButtons component */}

          {/* Footer */}
          <footer className="footer-icons">
            <a href="https://github.com/MohdAlmosawy" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaGithub />
              <span className="tooltip">Github</span>
            </a>
            <a href="https://drive.google.com/drive/folders/1c2NmVJNx2Z9m_xCsZGgjDufk3dAtDnOM?usp=sharing" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaDownload />
              <span className="tooltip">Download CV</span>
            </a>
            <a href="https://www.linkedin.com/in/smohdaqeel/" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaLinkedin />
              <span className="tooltip">LinkedIn</span>
            </a>
          </footer>
        </>
      )}
    </div>
  );
};

export default HomePage;
