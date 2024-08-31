// src/components/SysAdminPage/SysAdminPage.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import './SysAdminPage.css';

const SysAdminPage = () => {
  const terminalRef = useRef(null);
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);

  // Memoize showPrompt function
  const showPrompt = useCallback((xterm) => {
    const user = 'user';
    const host = 'sysadmin';
    const directory = '~';
    xterm.write(`\r\n${user}@${host}:${directory}$ `);
  }, []);

  // Memoize displayWelcomeMessage function
  const displayWelcomeMessage = useCallback((xterm) => {
    xterm.writeln("..      ___       __   __         ___    ___  __     ___       ___    ___  ___  __                              /..                             ");
    xterm.writeln("  |  | |__  |    /  ` /  \\  |\\/| |__      |  /  \\     |  |__| |__      |  |__  |__)  |\\/| | |\\ |  /\\  |        /                                ");
    xterm.writeln("  |/\\| |___ |___ \\__, \\__/  |  | |___     |  \\__/     |  |  | |___     |  |___ |  \\  |  | | | \\| /~~\\ |___    .                                 ");
    xterm.writeln("                                                                                                                                                ");
    xterm.writeln("                                                                                                                                                ");
    xterm.writeln("___       ___          __   __        __      __   ___     __            ___  __           __              __       __        __                ");
    xterm.writeln(" |  |__| |__     |  | /  \\ |__) |    |  \\    /  \\ |__     /__`  /\\  \\ / |__  |  \\     /\\  /__`     /\\     /__` \\ / /__`  /\\  |  \\  |\\/| | |\\ |  ");
    xterm.writeln(" |  |  | |___    |/\\| \\__/ |  \\ |___ |__/    \\__/ |       .__/ /~~\\  |  |___ |__/    /~~\\ .__/    /~~\\    .__/  |  .__/ /~~\\ |__/  |  | | | \\| .");
    xterm.writeln("                                                                                                                                                ");

    // Show the prompt after the welcome message
    showPrompt(xterm);
  }, [showPrompt]); // Add showPrompt as a dependency

  // Memoize executeCommand function
  const executeCommand = useCallback((xterm, fitAddon) => {
    const inputLine = xterm.buffer.active.getLine(xterm.buffer.active.cursorY - 1).translateToString(false);
    const command = inputLine.split('$ ')[1];

    // Check if the command is undefined or empty
    if (!command || command.trim() === '') {
      showPrompt(xterm);
      return;
    }

    const trimmedCommand = command.trim();

    if (trimmedCommand === 'ls') {
      xterm.writeln('Documents  Downloads  Music  Pictures  Videos');
    } else if (trimmedCommand === 'fortune') {
      xterm.writeln('You will learn a lot from this terminal session!');
    } else if (trimmedCommand === 'cowsay') {
      xterm.writeln('  _____ \n< Moo! >\n  ----- \n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||');
    } else if (trimmedCommand === 'clear') {
      xterm.clear();
    } else {
      xterm.writeln(`Command not found: ${trimmedCommand}`);
    }

    // Store the command in history and reset index
    setCommandHistory((prevHistory) => [...prevHistory, trimmedCommand]);
    setCurrentCommandIndex(-1);

    showPrompt(xterm);
    fitAddon.fit();
  }, [showPrompt]); // Add showPrompt as a dependency

  // Memoize handleTerminalInput function
  const handleTerminalInput = useCallback((data, xterm, fitAddon) => {
    switch (data) {
      case '\r': // Enter
        executeCommand(xterm, fitAddon);
        break;
      case '\u007F': // Backspace (DEL)
        if (xterm.buffer.active.cursorX > 2) {
          xterm.write('\b \b');
        }
        break;
      case '\u001B[A': // Up arrow for command history
        if (commandHistory.length > 0) {
          setCurrentCommandIndex((prevIndex) =>
            Math.max(prevIndex - 1, 0)
          );
          xterm.write(`\r${commandHistory[currentCommandIndex]}`);
        }
        break;
      case '\u001B[B': // Down arrow for command history
        if (commandHistory.length > 0) {
          setCurrentCommandIndex((prevIndex) =>
            Math.min(prevIndex + 1, commandHistory.length - 1)
          );
          xterm.write(`\r${commandHistory[currentCommandIndex]}`);
        }
        break;
      default: // Regular characters
        xterm.write(data);
    }
  }, [commandHistory, currentCommandIndex, executeCommand]); // Add executeCommand to dependencies

  useEffect(() => {
    const xterm = new Terminal({
        theme: {
          background: '#121212', // Custom background color
          foreground: '#e0e0e0', // Custom text color
          cursor: '#FFCC00',     // Custom cursor color
          cursorAccent: '#FFFFFF', // Cursor accent color for better visibility
        },
        cursorBlink: true, // Enable cursor blinking
        cursorStyle: 'underline', // Use an underline cursor to ensure underscores are visible
        fontFamily: 'Courier New, Consolas, Fira Code, monospace', // Update font family
        fontSize: 14,
        lineHeight: 1.2, // Consistent line height
      });

    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);

    if (terminalRef.current) {
      xterm.open(terminalRef.current);
      requestAnimationFrame(() => {
        fitAddon.fit();
      });

      // Display the ASCII art and welcome message on terminal start
      displayWelcomeMessage(xterm);

      xterm.onData((data) => {
        handleTerminalInput(data, xterm, fitAddon);
      });

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
  }, [handleTerminalInput, showPrompt, displayWelcomeMessage]); // Include handleTerminalInput, showPrompt, and displayWelcomeMessage in the dependency array

  return (
    <div ref={terminalRef} className="sysadmin-terminal"></div>
  );
};

export default SysAdminPage;
