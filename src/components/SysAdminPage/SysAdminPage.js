// src/components/SysAdminPage/SysAdminPage.js
import React, { useEffect, useRef, useCallback } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import './SysAdminPage.css';

const SysAdminPage = () => {
  const terminalRef = useRef(null);
  const commandRef = useRef(''); // To store the current command being typed

  // Memoize showPrompt function
  const showPrompt = useCallback((xterm) => {
    const user = 'user';
    const host = 'sysadmin';
    const directory = '~';
    xterm.write(`\r\n${user}@${host}:${directory}$ `); // Move to new line and show prompt
  }, []);

  // Memoize displayWelcomeMessage function with a new line before the ASCII art
  const displayWelcomeMessage = useCallback((xterm) => {
    xterm.writeln(''); // Add a new line before ASCII art
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

  // Handle user input and display responses
  const handleTerminalInput = useCallback((xterm, fitAddon) => {
    xterm.onData((data) => {
      if (data === '\r') { // Enter key
        // Check the command entered
        if (commandRef.current.trim() === 'ls') {
          xterm.writeln(''); // Move to the next line
          xterm.writeln('Documents  Downloads  Music  Pictures  Videos'); // Display directory list
        } else if (commandRef.current.trim() === 'clear') {
          xterm.clear(); // Clear the terminal, including the 'clear' command line
          commandRef.current = ''; // Reset the command buffer
          displayWelcomeMessage(xterm); // Display the ASCII art and welcome message again
          return; // Exit to prevent showing a new prompt immediately after
        } else {
          xterm.writeln(''); // Move to the next line
          xterm.writeln('hello world !!'); // Print "hello world !!" in yellow color
        }
        commandRef.current = ''; // Reset the command buffer
        showPrompt(xterm); // Show prompt again on a new line
      } else if (data === '\u007F') { // Backspace key
        if (xterm.buffer.active.cursorX > 2) { // Prevent backspacing over the prompt
          xterm.write('\b \b'); // Move cursor back, write space, then move back again
          commandRef.current = commandRef.current.slice(0, -1); // Remove last character from command buffer
        }
      } else {
        xterm.write(data); // Display the user's input
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
      cursorStyle: 'block',
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

      // Handle user input
      handleTerminalInput(xterm, fitAddon);

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
    <div ref={terminalRef} className="sysadmin-terminal"></div>
  );
};

export default SysAdminPage;
