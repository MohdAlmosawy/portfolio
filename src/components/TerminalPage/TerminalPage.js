// src/components/TerminalPage/TerminalPage.js
import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import './TerminalPage.css';

const TerminalPage = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    // Initialize terminal with customized settings
    const xterm = new Terminal({
      theme: {
        background: '#121212', // Custom background color
        foreground: '#e0e0e0', // Custom text color
        cursor: '#FFCC00',     // Custom cursor color
        cursorAccent: '#FFFFFF',
        selection: '#FFFFFF44', // Custom selection color (semi-transparent white)
        black: '#000000',
        red: '#FF5555',
        green: '#50FA7B',
        yellow: '#F1FA8C',
        blue: '#BD93F9',
        magenta: '#FF79C6',
        cyan: '#8BE9FD',
        white: '#BFBFBF',
        brightBlack: '#4D4D4D',
        brightRed: '#FF6E67',
        brightGreen: '#5AF78E',
        brightYellow: '#F4F99D',
        brightBlue: '#CAA9FA',
        brightMagenta: '#FF92D0',
        brightCyan: '#9AEDFE',
        brightWhite: '#E6E6E6',
      },
      cursorBlink: true, // Enables cursor blinking
      fontFamily: 'monospace', // Ensures a good terminal font
      fontSize: 14, // Adjust font size as needed
    });

    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);

    if (terminalRef.current) {
      xterm.open(terminalRef.current);

      requestAnimationFrame(() => {
        fitAddon.fit();
      });

      xterm.writeln('Welcome to My Custom Terminal!');
      xterm.write('$ ');

      xterm.onData((data) => {
        if (data === '\r') {
          xterm.writeln('Documents  Downloads  Music  Pictures  Videos');
          xterm.write('$ ');
          fitAddon.fit();
        }
      });

      const handleResize = () => {
        fitAddon.fit();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        xterm.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div
      ref={terminalRef}
      className="terminal-container"
    ></div>
  );
};

export default TerminalPage;
