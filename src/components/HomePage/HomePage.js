import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import ComingSoon from '../ComingSoon/ComingSoon';
import NavButtons from '../NavButtons/NavButtons';

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
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    if (isInitial) {
      const initialTimeout = setTimeout(() => {
        setIsInitial(false);
        setCurrentRole(0);
      }, 1000);

      return () => clearTimeout(initialTimeout);
    } else {
      const interval = setInterval(() => {
        setCurrentRole(prevRole => (prevRole + 1) % roles.length);
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isInitial]);

  const handleButtonClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative px-3 sm:px-6 lg:px-8 overflow-x-hidden"
    >
      {selectedSection ? (
        <ComingSoon />
      ) : (
        <div className="container mx-auto max-w-7xl min-h-screen flex flex-col justify-between py-8 sm:py-16 lg:py-20">
          {/* Main Content Wrapper */}
          <div className="flex-grow flex flex-col justify-center">
            {/* Header */}
            <header className="text-center mb-8 sm:mb-12">
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-base lg:text-lg px-4">
                It's impossible to fit myself into just one box, so here, I'm introducing a few of the many.
              </p>
              <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2 px-2">
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold gradient-text">
                  I'm Sayed Mohamed Ebrahim,
                </h2>
                <p className="text-base sm:text-xl lg:text-2xl text-gray-300">
                  and ... drumroll please 🥁 ...
                </p>
              </div>
            </header>

            {/* Main Greeting */}
            <div className="text-center mb-8 sm:mb-12">
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 gradient-text"
              >
                Hello World!!
              </motion.h1>
              <div className="space-y-2 px-4">
                <p className="text-lg sm:text-2xl lg:text-3xl text-gray-300">
                  I'm a{" "}
                  <span className="text-yellow-400 font-bold block sm:inline">
                    {isInitial ? "" : roles[currentRole]}
                  </span>
                </p>
                <p className="text-lg sm:text-2xl lg:text-3xl text-gray-300">
                  Jack of all trades, master of MANY.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 sm:mt-12 px-2">
              <NavButtons onButtonClick={handleButtonClick} centered={true} />
            </div>
          </div>

          {/* Footer */}
          <footer className="pt-8 sm:pt-12">
            <div className="flex justify-center items-center space-x-8 sm:space-x-12">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/MohdAlmosawy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-wrapper group"
              >
                <FaGithub className="text-lg sm:text-2xl" />
                <span className="social-tooltip group-hover:opacity-100">Github</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://drive.google.com/drive/folders/1c2NmVJNx2Z9m_xCsZGgjDufk3dAtDnOM?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-wrapper"
              >
                <FaDownload className="text-lg sm:text-2xl" />
                <span className="social-tooltip">Download CV</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/smohdaqeel/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-wrapper"
              >
                <FaLinkedin className="text-lg sm:text-2xl" />
                <span className="social-tooltip">LinkedIn</span>
              </motion.a>
            </div>
          </footer>
        </div>
      )}

      {/* Decorative blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 h-[200px] w-[200px] sm:h-[500px] sm:w-[500px] rounded-full bg-purple-500/20 blur-3xl animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 h-[200px] w-[200px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-500/20 blur-3xl animate-blob"></div>
      </div>
    </motion.div>
  );
};

export default HomePage;
