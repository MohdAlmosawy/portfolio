
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
  
// Function to get file content
const getFileContent = (path, fileName, options = '') => {
  let currentDir = directoryStructure['~'];

  for (const dir of path.split('/').slice(1)) { // Navigate to the current path
    if (currentDir && currentDir.children && currentDir.children[dir]) {
      currentDir = currentDir.children[dir];
    } else {
      return null; // Path is invalid
    }
  }

  // Return the content for specific files as an array of strings (lines)
  if (currentDir.children[fileName]) {
    if (fileName === 'skills.txt') {
      if (options === '-a') {
        return [
          "All Skills:",
          "- Programming Languages: Python, JavaScript, HTML/XML/CSS, Go, Java, PHP, C++",
          "- Frameworks & Libraries: OWL, Django, Node.js, React.js, Express.js, jQuery",
          "- Databases: PostgreSQL, SQL, MySQL, MongoDB",
          "- Software Testing & QA: Python/JS unit tests, ISTQB software testing, Tours (Integration Testing)",
          "- Version Control: Git, GitHub, Gitea",
          "- CI/CD: GitHub Actions, Heroku",
          "- Containers & Virtualization: Docker, Google Cloud VMs, Amazon EC2",
          "- Cloud & Networking: Odoo.sh, Google Cloud (GCP), CCNA: TCP/IP, DNS, DHCP",
          "- Operating Systems: Linux (Ubuntu, Debian, Kali, Mint), Windows",
          "- Project Management: SDLC, Agile (Scrum, Kanban), project planning, task tracking",
          "- API Integration: XML-RPC External API, JSON-RPC2 Extract API",
          "- Problem-Solving: Analytical thinking, troubleshooting, finding innovative solutions",
          "- Tools & Software: Odoo ERP, Adobe Suites",
          "- Leadership: Team management, delegation, conflict resolution, motivating others",
          "- Time Management: Prioritization, meeting deadlines, multi-tasking, managing multiple projects",
          "- Communication: Collaborative, active listening, responsive, knowledge transfer",
          "- Comprehensive IT Knowledge: Operations, Sys-Admin, Development, DevOps, Networking, Project Management",
          "- Stakeholder Communication: Aligning IT with business needs",
          "- Technology Selection & Strategy: Technology stack selection, best practices in development and security"
        ];
      } else {
        return [
          "Relevant System Administration Skills:",
          "- Scripting and Automation: Python, Bash",
          "- Database Management: PostgreSQL, MySQL, SQL",
          "- Networking: TCP/IP, DNS, DHCP, VPN",
          "- Containers and Virtualization: Docker, Google Cloud VMs, Amazon EC2",
          "- Cloud Management: Google Cloud (GCP), Odoo.sh",
          "- Operating Systems: Linux (Ubuntu, Debian, Kali, Mint), Windows",
          "- Version Control: Git, GitHub, Gitea",
          "- CI/CD: GitHub Actions, Heroku",
          "- Project Management: SDLC, Agile (Scrum, Kanban)",
          " ",
          "[usage] cat skills.txt -a : to list all Skills"
        ];
      }
    } else if (fileName === 'tools.txt') {
      if (options === '-a') {
        return [
          "All Tools and Software:",
          "- Programming and Scripting: Python, JavaScript, Bash",
          "- Frameworks and Libraries: OWL, Django, Node.js, React.js, Express.js, jQuery",
          "- Databases: PostgreSQL, SQL, MySQL, MongoDB",
          "- Virtualization: Docker, Google Cloud VMs, Amazon EC2, VMware",
          "- Networking: Wireshark, Netcat",
          "- Performance Tuning: htop, iotop",
          "- Network Analysis: Nmap, Traceroute",
          "- Application Monitoring: Odoo.sh tools, Google Cloud Monitoring",
          "- System Monitoring and Logging: Odoo logs, Google Cloud Logging",
          "- Version Control: Git, GitHub, Gitea",
          "- CI/CD: GitHub Actions, Heroku",
          "- Cloud Platforms: Google Cloud (GCP), Odoo.sh",
          "- Operating Systems: Linux (Ubuntu, Debian, Kali, Mint), Windows",
          "- Project Management: SDLC tools, Agile tools (Scrum, Kanban)",
          "- API Tools: Postman, Curl",
          "- Security Tools: OpenSSL, Fail2Ban",
          "- Web Development Tools: Chrome DevTools, VS Code",
          "- Design Tools: Adobe Creative Suite"
        ];
      } else {
        return [
          "Relevant System Administration Tools and Software:",
          "- Virtualization: Docker, VMware",
          "- Scripting and Automation: Bash scripting",
          "- Networking: Wireshark, Netcat",
          "- Performance Tuning: htop, iotop",
          "- Network Analysis: Nmap, Traceroute",
          "- Application Monitoring: Odoo.sh tools, Google Cloud Monitoring",
          "- System Monitoring and Logging: Odoo logs, Google Cloud Logging",
          "- Version Control: Git, GitHub",
          " ",
          "[usage] cat tools.txt -a : to list all Tools and Software"
        ];
      }
    } else if (fileName === 'about.txt') {
      return [
        "Sayed Mohamed Aqeel Ebrahim - System Administrator",
        "",
        "I began my journey as a system integrator,",
        "implementing solutions for various companies.",
        "Over time, my role evolved into that of a System Administrator,",
        "taking on tasks from server management to network configuration.",
        "",
        "In the early days, I was a novice,",
        "often copying and pasting commands from the internet",
        "without fully understanding them.",
        "",
        "Today, I am driven by a deep passion for learning and a solid foundation in networking,",
        "backed by my CCNA certification and Network+ studies.",
        "",
        "With hands-on experience in both Ubuntu and Windows environments,",
        "I've also managed virtual machines on Google Cloud,",
        "constantly striving to understand the intricacies of each task I undertake.",
        "",
        "Let's navigate through my world as a SysAdmin",
        "and see what we can discover together!"
      ];
    } else if (fileName === 'contact.txt') {
      return [
        "Contact Me:",
        "- Phone (BH) : +973 39541613",
        "- Phone (KSA) : +966 561 325 240",
        "- Email: mohd.s.aqeel@gmail.com",
        "- LinkedIn: linkedin.com/in/SmohdAqeel",
        "- GitHub: github.com/MohdAlmosawy"
      ];
    } else if (fileName === 'certifications.txt') {
      if (options === '-a') {
        return [
          "Education & Certifications:",
          "- BCS in Information Systems, University of Bahrain (Aug 2016)",
          "- Software Engineering, Reboot 01 Coding Institute (Apr 2026)",
          "- Full Stack Development, General Assembly (Sep 2022)",
          "- CCNA - Routing and Switching, Cisco Systems, Inc. (Feb 2022)",
          "- Adobe Certified Expert, Adobe Inc. (Aug 2018)"
        ];
      } else {
        return [
          "Related Education & Certifications:",
          "- BCS in Information Systems, University of Bahrain (Aug 2016)",
          "- CCNA - Routing and Switching, Cisco Systems, Inc. (Feb 2022)",
          " ",
          "[usage] cat certifications.txt -a : to list all Education & Certifications"
        ];
      }
    } else if (fileName === 'README.md' && path === '~/projects/Backup_Automation') {
      return [
        "Project: Backup Automation System",
        "Description: Developed and deployed a fully automated backup system across all company servers,",
        "ensuring data integrity and security.",
        "Key Features:",
        "- Automated daily and weekly backups with logging and error notifications.",
        "- Integrated with cloud storage solutions for offsite backups.",
        "- Reduced manual backup efforts by 80%."
      ];
    } else if (fileName === 'README.md' && path === '~/experience/Next_Level_Trading') {
      return [
        "ERP System Administrator, Next Level Trading (Feb 2022 - Jul 2024):",
        "- Customized Odoo ERP to enhance operational efficiency and reduce manual processes.",
        "- Managed IT infrastructure, including server maintenance, network configuration, and software updates.",
        "- Implemented a comprehensive disaster recovery plan, achieving zero data loss.",
        "- Conducted regular system performance evaluations and optimizations, maintaining 99% uptime."
      ];
    } else {
      return [`Contents of ${fileName}`]; // Generic content for any other files
    }
  }

  return null; // File not found in the directory
};



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
        } else {
            const currentPathArray = currentDirectoryRef.current.slice(); // Clone the current path array
            let currentDir = directoryStructure['~']; // Start from the root directory

            for (const dir of currentPathArray.slice(1)) { // Iterate over current path (skip the root '~')
                currentDir = currentDir.children[dir]; // Traverse to the next level directory
            }

            const targetDir = currentDir.children[args[1]]; // Get the target directory
            if (targetDir?.type === 'directory') {
                currentDirectoryRef.current = [...currentDirectoryRef.current, args[1]]; // Navigate into directory
            } else {
                return `No such file or directory: ${args[1]}`;
            }
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

  

// List of available commands for auto-completion
const availableCommands = ['ls', 'cd', 'cat', 'clear', 'help', 'tree', 'exit'];

// Handle user input and display responses
const handleTerminalInput = useCallback((fitAddon) => {
  terminalInstance.current.onData((data) => {
    if (data === '\r') { // Enter key
      const input = commandRef.current.trim(); // Get the trimmed input
      const args = input.split(' '); // Split the command to check for multiple parts

      // Check the command entered
      if (args[0] === 'ls') {
        terminalInstance.current.writeln(''); // Move to the next line
        const path = currentDirectoryRef.current.join('/'); // Get current path
        const directoryContents = Object.keys(getSubDirectory(currentDirectoryRef.current)); // Fetch directory contents

        if (directoryContents.length > 0) {
          terminalInstance.current.writeln(directoryContents.join('  ')); // Display directory contents
        } else {
          terminalInstance.current.writeln('No files or directories found.'); // No contents to display
        }

      } else if (args[0] === 'cat' && args[1] && !args[2]) {
        terminalInstance.current.writeln(''); // Move to the next line
        const path = currentDirectoryRef.current.join('/');
        const fileContent = getFileContent(path, args[1]);

        if (fileContent) {
          fileContent.forEach(line => terminalInstance.current.writeln(line)); // Display each line of the file content
        } else {
          terminalInstance.current.writeln(`No such file: ${args[1]}`); // File not found message
        }

      } else if (args[0] === 'cat' && args[1] && args[2]) {
        terminalInstance.current.writeln(''); // Move to the next line
        const path = currentDirectoryRef.current.join('/');
        const fileContent = getFileContent(path, args[1], args[2]);

        if (fileContent) {
          fileContent.forEach(line => terminalInstance.current.writeln(line)); // Display each line of the file content
        } else {
          terminalInstance.current.writeln(`No such file: ${args[1]}`); // File not found message
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

    } else if (data === '\u0009') { // Tab key for auto-completion
      const input = commandRef.current.trim();
      const args = input.split(' ');

      if (args.length === 1) {
        // Autocomplete command names
        const matchingCommands = availableCommands.filter(cmd => cmd.startsWith(args[0]));

        if (matchingCommands.length === 1) {
          // Only one match, autocomplete the command
          const completion = matchingCommands[0].slice(args[0].length);
          terminalInstance.current.write(completion);
          commandRef.current += completion;
        } else if (matchingCommands.length > 1) {
          // Multiple matches, display all matching commands
          terminalInstance.current.writeln('');
          matchingCommands.forEach(cmd => terminalInstance.current.writeln(cmd));
          showPrompt();
          terminalInstance.current.write(commandRef.current);
        }
      } else if (args.length > 1) {
        // Autocomplete file or directory names in the current directory
        const currentPath = currentDirectoryRef.current.join('/');
        const directoryContents = Object.keys(getSubDirectory(currentDirectoryRef.current));

        const matchingContents = directoryContents.filter(item => item.startsWith(args[1]));

        if (matchingContents.length === 1) {
          // Only one match, autocomplete the file or directory name
          const completion = matchingContents[0].slice(args[1].length);
          terminalInstance.current.write(completion);
          commandRef.current += completion;
        } else if (matchingContents.length > 1) {
          // Multiple matches, display all matching files and directories
          terminalInstance.current.writeln('');
          matchingContents.forEach(item => terminalInstance.current.writeln(item));
          showPrompt();
          terminalInstance.current.write(commandRef.current);
        }
      }
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


