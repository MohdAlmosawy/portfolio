
// src/components/SysAdminPage/SysAdminPage.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import NavButtons from '../NavButtons/NavButtons'; // Import NavButtons component
import './SysAdminPage.css';

const SysAdminPage = () => {
  const terminalRef = useRef(null);
  const commandRef = useRef(''); // To store the current command being typed
  const terminalInstance = useRef(null); // Reference to the terminal instance
  const currentDirectoryRef = useRef(['~']);


  // Directory structure
  const directoryStructure = {
    '~': {
      type: 'directory',
      children: {
        'about.txt': { type: 'file' },
        'contact.txt': { type: 'file' },
        'skills.txt': { type: 'file' },
        'certifications.txt': { type: 'file' },
        'tools.txt': { type: 'file' },
        'projects': {
          type: 'directory',
          children: {
            'Backup_Automation': {
              type: 'directory',
              children: { 'README.md': { type: 'file' } },
            },
            'Security_Audits': {
              type: 'directory',
              children: { 'README.md': { type: 'file' } },
            },
            'Cloud_Migration': {
              type: 'directory',
              children: { 'README.md': { type: 'file' } },
            },
            'Network_Optimization': {
              type: 'directory',
              children: { 'README.md': { type: 'file' } },
            },
            'Monitoring_Dashboard': {
              type: 'directory',
              children: { 'README.md': { type: 'file' } },
            },
          },
        },
        'experience': {
          type: 'directory',
          children: {
            'Next_Level_Trading': {
              type: 'directory',
              children: { 'README.md': { type: 'file' } },
            },
            'Ghost_Computers': {
              type: 'directory',
              children: { 'README.md': { type: 'file' } },
            },
            'Ministry_of_Labor': {
              type: 'directory',
              children: { 'README.md': { type: 'file' } },
            },
          },
        },
        'odoo_sh': {
          type: 'directory',
          children: {
            'deployment.txt': { type: 'file' },
            'customization.txt': { type: 'file' },
            'performance.txt': { type: 'file' },
          },
        },
        'network': {
          type: 'directory',
          children: {
            'skills.txt': { type: 'file' },
            'troubleshooting.txt': { type: 'file' },
          },
        },
        'odoo_tools': {
          type: 'directory',
          children: {
            'attachment_queue.txt': { type: 'file' },
            'auto_backup.txt': { type: 'file' },
            'auditlog.txt': { type: 'file' },
            'database_cleanup.txt': { type: 'file' },
            'sentry.txt': { type: 'file' },
            'server_action_logging.txt': { type: 'file' },
            'attachment_synchronize.txt': { type: 'file' },
            'base_cron_exclusion.txt': { type: 'file' },
            'tracking_manager.txt': { type: 'file' },
          },
        },
      },
    },
  };

  // Function to get the current path as a string
  const getCurrentPath = () => currentDirectoryRef.current.join('/').replace('~', '/');

  const showPrompt = useCallback(() => {
    const user = 'user';
    const host = 'sysadmin';
    const directory = getCurrentPath();
    terminalInstance.current.write(`\r\n${user}@${host}:${directory}$ `);
  }, []);
  

  // Memoize displayWelcomeMessage function with a new line before the ASCII art
  const displayWelcomeMessage = useCallback(() => {
    terminalInstance.current.writeln(''); // Add a new line before ASCII art
    terminalInstance.current.writeln("..      ___       __   __         ___    ___  __     ___       ___    ___  ___  __                              /..                             ");
    terminalInstance.current.writeln("  |  | |__  |    /  ` /  \\  |\\/| |__      |  /  \\     |  |__| |__      |  |__  |__)  |\\/| | |\\ |  /\\  |        /                                ");
    terminalInstance.current.writeln("  |/\\| |___ |___ \\__, \\__/  |  | |___     |  \\__/     |  |  | |___     |  |___ |  \\  |  | | | \\| /~~\\ |___    .                                 ");
    terminalInstance.current.writeln("                                                                                                                                                ");
    terminalInstance.current.writeln("                                                                                                                                                ");
    terminalInstance.current.writeln("___       ___          __   __        __      __   ___     __            ___  __           __              __       __        __                ");
    terminalInstance.current.writeln(" |  |__| |__     |  | /  \\ |__) |    |  \\    /  \\ |__     /__`  /\\  \\ / |__  |  \\     /\\  /__`     /\\     /__` \\ / /__`  /\\  |  \\  |\\/| | |\\ |  ");
    terminalInstance.current.writeln(" |  |  | |___    |/\\| \\__/ |  \\ |___ |__/    \\__/ |       .__/ /~~\\  |  |___ |__/    /~~\\ .__/    /~~\\    .__/  |  .__/ /~~\\ |__/  |  | | | \\| .");
    terminalInstance.current.writeln("                                                                                                                                                ");

    // Show the prompt after the welcome message
    showPrompt();
  }, [showPrompt]); // Add showPrompt as a dependency

  // Function to handle navigation commands
  const handleNavigation = (input) => {
    const args = input.split(' ');
    if (args[0] === 'cd') {
      if (args[1] === '~') {
        currentDirectoryRef.current = ['~']; // Go to root
      } else if (args[1] === '..') {
        if (currentDirectoryRef.current.length > 1) {
          currentDirectoryRef.current = currentDirectoryRef.current.slice(0, -1); // Go up one level
        }
      } else if (args[1] === '../..') {
        currentDirectoryRef.current = ['~']; // Go back to root from any subdirectory
      } else if (args[1] && directoryStructure[currentDirectoryRef.current.join('/')].children[args[1]]?.type === 'directory') {
        currentDirectoryRef.current = [...currentDirectoryRef.current, args[1]]; // Navigate into directory
      } else {
        return `No such file or directory: ${args[1]}`;
      }
    }
    return ''; // Return an empty string if navigation is successful
  };
  
  // Function to print the directory tree
// Function to print the directory tree from the current path
const printTree = (xterm, directory, prefix = '') => {
  const entries = Object.entries(directory);

  entries.forEach(([name, info], index) => {
    const isLastEntry = index === entries.length - 1;
    const connector = isLastEntry ? '└── ' : '├── ';
    const childPrefix = isLastEntry ? '    ' : '│   ';

    xterm.writeln(`${prefix}${connector}${name}`);

    if (info.type === 'directory' && info.children) {
      printTree(xterm, info.children, prefix + childPrefix);
    }
  });
};

// Function to get the subdirectory structure from the current path
const getSubDirectory = (pathArray) => {
  let subDir = directoryStructure['~'];

  for (const dir of pathArray.slice(1)) {
    if (subDir && subDir.children && subDir.children[dir]) {
      subDir = subDir.children[dir];
    } else {
      return null; // If the path is invalid
    }
  }

  return subDir?.children || {}; // Return children of the subdirectory
};

  

  // Handle user input and display responses

  const handleTerminalInput = useCallback((fitAddon) => {
    terminalInstance.current.onData((data) => {
      if (data === '\r') { // Enter key
        const input = commandRef.current.trim(); // Get the trimmed input
  
        // Check the command entered
        if (input === 'ls') {
          terminalInstance.current.writeln(''); // Move to the next line
          const path = currentDirectoryRef.current.join('/'); // Get current path
          const directoryContents = Object.keys(getSubDirectory(currentDirectoryRef.current)); // Fetch directory contents
  
          if (directoryContents.length > 0) {
            terminalInstance.current.writeln(directoryContents.join('  ')); // Display directory contents
          } else {
            terminalInstance.current.writeln('No files or directories found.'); // No contents to display
          }
  
        } else if (input === 'clear') {
          terminalInstance.current.clear(); // Clear the terminal, including the 'clear' command line
          commandRef.current = ''; // Reset the command buffer
          displayWelcomeMessage(); // Display the ASCII art and welcome message again
          return; // Exit to prevent showing a new prompt immediately after
        } else if (input === 'help') {
          terminalInstance.current.writeln(''); // Move to the next line
          terminalInstance.current.writeln('Available commands:');
          terminalInstance.current.writeln('- tree: Display the directory structure as a tree.');
          terminalInstance.current.writeln('- ls: List the contents of the current directory.');
          terminalInstance.current.writeln('- cd <directory>: Change to a specified directory.');
          terminalInstance.current.writeln('- cat <file>: Display the contents of a specified file.');
          terminalInstance.current.writeln('- exit: Exit the terminal session.');
          terminalInstance.current.writeln('- help: Display this help message.');
          terminalInstance.current.writeln('- help -a: Display a full list of all commands with detailed descriptions.');
        } else if (input === 'help -a') {
          // (Existing help -a logic)
        } else if (input === 'tree') {
          terminalInstance.current.writeln(''); // Move to the next line
          const currentDir = getSubDirectory(currentDirectoryRef.current); // Get the current directory structure
          if (currentDir) {
            printTree(terminalInstance.current, currentDir); // Start printing the tree from the current directory
          } else {
            terminalInstance.current.writeln('Error: Unable to display tree.'); // Display error if path is invalid
          }
        } else if (input.startsWith('cd')) {
          const navigationMessage = handleNavigation(input);
          if (navigationMessage) {
            terminalInstance.current.writeln(''); // Move to the next line
            terminalInstance.current.writeln(navigationMessage); // Display navigation error message
          } else {
            terminalInstance.current.writeln(''); // Add a line break after cd command
          }
        } else {
          terminalInstance.current.writeln(''); // Move to the next line
          terminalInstance.current.writeln('\x1b[31m' + `Command not found: ${input}` + '\x1b[0m'); // Print error message in red color
          terminalInstance.current.writeln('Type "help" to see available commands.'); // Guide to use help
        }
  
        commandRef.current = ''; // Reset the command buffer
        showPrompt(); // Show prompt again on a new line
      } else if (data === '\u007F') { // Backspace key
        if (terminalInstance.current.buffer.active.cursorX > 2) { // Prevent backspacing over the prompt
          terminalInstance.current.write('\b \b'); // Move cursor back, write space, then move back again
          commandRef.current = commandRef.current.slice(0, -1); // Remove last character from command buffer
        }
      } else {
        terminalInstance.current.write(data); // Display the user's input
        commandRef.current += data; // Append character to the command buffer
      }
    });
  }, [showPrompt, displayWelcomeMessage]); // Ensure showPrompt and displayWelcomeMessage are included as dependencies
  
  

  useEffect(() => {
    const xterm = new Terminal({
      theme: {
        background: '#121212', // Custom background color
        foreground: '#e0e0e0', // Custom text color
        cursor: '#FFCC00',     // Custom cursor color
        cursorAccent: '#FFFFFF', // Cursor accent color for better visibility
      },
      cursorBlink: true, // Enable cursor blinking
      cursorStyle: 'block', // Use a block cursor to ensure a square appearance
      fontFamily: 'Courier New, Consolas, Fira Code, monospace', // Update font family
      fontSize: 14,
      lineHeight: 1.2, // Consistent line height
    });

    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);

    terminalInstance.current = xterm; // Store the terminal instance

    if (terminalRef.current) {
      xterm.open(terminalRef.current);
      requestAnimationFrame(() => {
        fitAddon.fit();
      });

      // Display the ASCII art and welcome message on terminal start
      displayWelcomeMessage();

      // Handle user input
      handleTerminalInput(fitAddon);

      // Fit terminal on window resize
      const handleResize = () => {
        fitAddon.fit();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        xterm.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [displayWelcomeMessage, handleTerminalInput]); // Ensure all dependencies are included

  return (
    <div className="sysadmin-page">
      {/* Render navigation buttons at the top */}
      <NavButtons showHomeButton={true} centered={false} />

      {/* Terminal container */}
      <div ref={terminalRef} className="sysadmin-terminal"></div>
    </div>
  );
};

export default SysAdminPage;
