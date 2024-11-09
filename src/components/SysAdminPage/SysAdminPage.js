// src/components/SysAdminPage/SysAdminPage.js
import React, { useEffect, useRef, useCallback } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import NavButtons from '../NavButtons/NavButtons'; // Import NavButtons component
import './SysAdminPage.css';
import PageTemplate from '../PageTemplate/PageTemplate';

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
            'network_skills.txt': { type: 'file' },
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
        "Description: As a System Administrator managing Odoo environments, I developed and deployed a fully automated backup system to ensure data integrity and security across all company servers.",
        "Key Features:",
        "- Automated daily and weekly backups with logging and error notifications to monitor backup status.",
        "- Integrated cloud storage solutions for offsite backups, providing a robust disaster recovery strategy.",
        "- Reduced manual backup efforts by 80% through automation, freeing up time for more strategic tasks.",
        "",
        "Tools Used:",
        "- **auto_backup**: Configured to schedule regular automated backups of the Odoo database to prevent data loss.",
        "- **database_cleanup**: Integrated to optimize database performance before backups, ensuring efficient storage and retrieval.",
        "- **attachment_queue**: Utilized to manage the queuing of attachments during backup processes, preventing server overload."
      ];
    } else if (fileName === 'README.md' && path === '~/projects/Security_Audits') {
      return [
        "Project: Security Audits",
        "Description: Conducted comprehensive security audits within Odoo environments to identify vulnerabilities, enforce compliance, and ensure the safety of sensitive business data.",
        "Key Features:",
        "- Implemented automated vulnerability scanning tools to regularly check Odoo system configurations for security gaps.",
        "- Conducted manual penetration testing to simulate potential cyber-attacks and assess the robustness of system defenses.",
        "- Developed detailed security reports and recommended actions to mitigate identified risks.",
        "- Enforced security policies such as multi-factor authentication and IP whitelisting within Odoo to prevent unauthorized access.",
        "",
        "Tools Used:",
        "- **auditlog**: Deployed to log and monitor all actions within the Odoo system, providing an audit trail for security analysis.",
        "- **sentry**: Configured to automatically report errors and security incidents, allowing for real-time monitoring and quick response.",
        "- **server_action_logging**: Used to log server actions, enhancing the ability to detect and respond to suspicious activities."
      ];
    } else if (fileName === 'README.md' && path === '~/projects/Cloud_Migration') {
      return [
        "Project: Cloud Migration",
        "Description: Led the migration of Odoo environments from on-premises infrastructure to cloud-based solutions, optimizing scalability, performance, and cost-efficiency.",
        "Key Features:",
        "- Conducted a thorough assessment of the existing Odoo infrastructure to identify cloud-compatible components.",
        "- Developed a comprehensive migration plan, including risk management and rollback procedures to ensure a smooth transition.",
        "- Utilized AWS and Google Cloud platforms to deploy scalable and flexible Odoo environments.",
        "- Automated deployment pipelines were set up to minimize downtime and streamline the migration process.",
        "",
        "Tools Used:",
        "- **module_auto_update**: Configured to keep all Odoo modules up-to-date automatically during and after the migration process.",
        "- **bus_alt_connection**: Implemented to manage database connections effectively using PgBouncer during high-load scenarios.",
        "- **base_cron_exclusion**: Used to exclude non-critical scheduled actions during the migration process, ensuring stability."
      ];
    } else if (fileName === 'README.md' && path === '~/projects/Network_Optimization') {
      return [
        "Project: Network Optimization",
        "Description: Optimized the network architecture supporting Odoo environments to improve performance, security, and reliability.",
        "Key Features:",
        "- Analyzed Odoo network traffic patterns using advanced monitoring tools to identify and resolve bottlenecks.",
        "- Implemented VLAN segmentation within the Odoo environment to enhance security and manage network traffic efficiently.",
        "- Deployed Quality of Service (QoS) policies to prioritize critical Odoo services, ensuring optimal performance.",
        "- Configured and optimized firewall rules and routing protocols to minimize latency and protect Odoo data from potential threats.",
        "",
        "Tools Used:",
        "- **base_cron_exclusion**: Managed cron jobs to prevent network overload during peak operation times in the Odoo environment.",
        "- **session_db**: Configured to store Odoo sessions in the database, improving performance and reliability.",
        "- **scheduler_error_mailer**: Utilized to send alerts for any network-related errors within the Odoo environment, facilitating quick troubleshooting."
      ];
    } else if (fileName === 'README.md' && path === '~/projects/Monitoring_Dashboard') {
      return [
        "Project: Monitoring Dashboard",
        "Description: Developed a comprehensive monitoring dashboard to oversee the health and performance of Odoo environments, enabling proactive system management.",
        "Key Features:",
        "- Integrated various data sources, including server logs, application metrics, and network traffic, into a unified Odoo monitoring dashboard.",
        "- Utilized Grafana and Prometheus for real-time data visualization and alerting on critical Odoo incidents.",
        "- Automated the collection and analysis of Odoo performance data, identifying trends and potential issues before they impact operations.",
        "- Set up role-based access controls to secure the monitoring dashboard and provide tailored views for different stakeholders.",
        "",
        "Tools Used:",
        "- **server_action_logging**: Employed to log Odoo server actions and monitor system performance, providing essential data for the dashboard.",
        "- **tracking_manager**: Configured to track changes across all fields within the Odoo environment, ensuring accurate and detailed monitoring.",
        "- **attachment_queue**: Used to manage the queue of log files and performance data, ensuring timely updates to the monitoring dashboard."
      ];
    } else if (fileName === 'README.md' && path === '~/experience/Next_Level_Trading') {
      return [
        "ERP System Administrator, Next Level Trading (Feb 2022 - Current):",
        "- Customized Odoo ERP to enhance operational efficiency and reduce manual processes.",
        "- Managed IT infrastructure, including server maintenance, network configuration, and software updates.",
        "- Implemented a comprehensive disaster recovery plan, achieving zero data loss.",
        "- Conducted regular system performance evaluations and optimizations, maintaining 99% uptime."
      ];
    } else if (fileName === 'README.md' && path === '~/experience/Ghost_Computers') {
      return [
        "IT Support Technician, Ghost Computers (May 2015 - Apr 2016):",
        "- Resolved critical system issues, including a major ransomware attack.",
        "- Streamlined IT support processes, reducing resolution times by 60%.",
        "- Trained junior technicians in troubleshooting and customer service."
      ];
    } else if (fileName === 'README.md' && path === '~/experience/Ministry_of_Labor') {
      return [
        "Help Desk Technician, Ministry of Labour - Internship (Mar 2017 - May 2017):",
        "- Troubleshot and resolved various hardware, software, and network connectivity problems.",
        "- Strong understanding of networking concepts and troubleshooting techniques",
        "- Conducted comprehensive IT inventory checks, updating PCs and devices and assessing their condition.",
      ];
    } else if (fileName === 'deployment.txt' && path === '~/odoo_sh') {
      return [
        "**Odoo.sh Deployment and Environment Management**",
        "",
        "- Managed multiple Odoo.sh instances for staging, testing, and production environments.",
        "- Configured automated backups, regular updates, and monitoring to ensure high availability and reliability.",
        "- Utilized Odoo.sh's built-in CI/CD tools to automate deployment processes, reducing downtime and deployment errors.",
        "- Ensured seamless migration of databases and modules between environments, maintaining data integrity and consistency."
      ];
    } else if (fileName === 'customization.txt' && path === '~/odoo_sh') {
      return [
        "**Odoo.sh Customization and Module Management**",
        "",
        "- Customized Odoo modules directly within the Odoo.sh environment to meet specific business needs.",
        "- Managed module dependencies and conflicts, ensuring a smooth and error-free deployment process.",
        "- Leveraged Odoo.sh's tools to develop, test, and deploy custom modules efficiently, reducing development time by 40%.",
        "- Automated routine tasks such as module updates, server reboots, and log monitoring to streamline operations."
      ];
    } else if (fileName === 'performance.txt' && path === '~/odoo_sh') {
      return [
        "**Odoo.sh Performance Monitoring and Optimization**",
        "",
        "- Implemented performance monitoring tools to track server load, response time, and database performance.",
        "- Conducted regular audits to optimize server performance and database queries, reducing latency by 30%.",
        "- Utilized caching strategies and load balancing to enhance the scalability and responsiveness of the Odoo environment.",
        "- Managed user roles and access controls to optimize system resources and maintain security compliance.",
      ];
    } else if (fileName === 'network_skills.txt' && path === '~/network') {
      return [
        "**Network Management Skills (CCNA and Network+)**",
        "",
        "- Certified in CCNA (Cisco Certified Network Associate) and CompTIA Network+.",
        "- Proficient in configuring and managing network devices, including routers, switches, and firewalls.",
        "- Experience in setting up secure VPNs, managing DNS, DHCP, and TCP/IP configurations to ensure secure and efficient network communication.",
        "- Conducted regular network audits and implemented security measures to protect against unauthorized access and cyber threats."
      ];
    } else if (fileName === 'troubleshooting.txt' && path === '~/network') {
      return [
        "**Network Troubleshooting and Optimization**",
        "",
        "- Diagnosed and resolved complex network issues involving multiple subnets and VLANs.",
        "- Utilized network monitoring tools like Wireshark and Netcat to analyze traffic and identify bottlenecks.",
        "- Optimized network performance through traffic shaping, load balancing, and QoS (Quality of Service) settings.",
        "- Trained team members on best practices for network management and troubleshooting."
      ];
    } else if (fileName === 'attachment_queue.txt' && path === '~/odoo_tools') {
      return [
        "**Attachment Queue** (Version: 16.0.1.2.0)",
        "Maintainers: florian-dacosta, sebastienbeau",
        "",
        "Summary:",
        "- Adds a queue system for processing files in Odoo, ensuring efficient handling of large volumes of attachments.",
        "",
        "Usage:",
        "- Utilized to manage and optimize file processing in Odoo, preventing server overload and enhancing performance.",
        "- Particularly useful in environments where bulk uploads or imports are frequent."
      ];
    } else if (fileName === 'auto_backup.txt' && path === '~/odoo_tools') {
      return [
        "**Auto Backup** (Version: 16.0.1.0.0)",
        "",
        "Summary:",
        "- Automates the process of backing up databases at scheduled intervals.",
        "",
        "Usage:",
        "- Configured regular backups to prevent data loss and ensure quick recovery in case of failure.",
        "- Implemented across multiple Odoo environments to maintain data integrity."
      ];
    } else if (fileName === 'auditlog.txt' && path === '~/odoo_tools') {
      return [
        "**Audit Log** (Version: 16.0.2.2.0)",
        "",
        "Summary:",
        "- Keeps a detailed log of all user actions in the Odoo system for audit purposes.",
        "",
        "Usage:",
        "- Deployed to track changes and ensure accountability within the system.",
        "- Helps in monitoring user activities and preventing unauthorized actions."
      ];
    } else if (fileName === 'database_cleanup.txt' && path === '~/odoo_tools') {
      return [
        "**Database Cleanup** (Version: 16.0.1.2.1)",
        "",
        "Summary:",
        "- A module designed to clean up unnecessary data from the database to improve performance.",
        "",
        "Usage:",
        "- Regularly used to remove old logs, temporary data, and other redundant information.",
        "- Improves database efficiency and reduces storage costs."
      ];
    } else if (fileName === 'sentry.txt' && path === '~/odoo_tools') {
      return [
        "**Sentry** (Version: 16.0.3.0.2)",
        "Maintainers: barsi, naglis, versada, moylop260, fernandahf",
        "",
        "Summary:",
        "- Integrates Sentry with Odoo to report errors and track performance issues.",
        "",
        "Usage:",
        "- Configured to automatically report errors to Sentry, allowing for real-time monitoring and troubleshooting.",
        "- Essential for maintaining high availability and performance in production environments."
      ];
    } else if (fileName === 'server_action_logging.txt' && path === '~/odoo_tools') {
      return [
        "**Server Action Logging** (Version: 16.0.1.0.0)",
        "",
        "Summary:",
        "- Logs server actions to track their execution and performance.",
        "",
        "Usage:",
        "- Used to monitor and debug server actions, ensuring smooth operation and quick issue resolution.",
        "- Helpful in identifying bottlenecks and optimizing server performance."
      ];
    } else if (fileName === 'attachment_synchronize.txt' && path === '~/odoo_tools') {
      return [
        "**Attachment Synchronize** (Version: 16.0.1.0.1)",
        "Maintainers: florian-dacosta, sebastienbeau, GSLabIt, bealdav",
        "",
        "Summary:",
        "- Synchronizes attachments across different environments or instances of Odoo.",
        "",
        "Usage:",
        "- Deployed to ensure consistency of attachments between development, staging, and production environments.",
        "- Facilitates seamless data migration and synchronization in multi-environment setups."
      ];
    } else if (fileName === 'base_cron_exclusion.txt' && path === '~/odoo_tools') {
      return [
        "**Base Cron Exclusion** (Version: 16.0.1.0.0)",
        "Maintainers: LoisRForgeFlow, ChrisOForgeFlow",
        "",
        "Summary:",
        "- Allows exclusion of certain scheduled actions from running simultaneously.",
        "",
        "Usage:",
        "- Implemented to manage cron jobs efficiently, preventing conflicts and ensuring optimal resource usage.",
        "- Crucial for maintaining stability in environments with multiple scheduled tasks."
      ];
    } else if (fileName === 'tracking_manager.txt' && path === '~/odoo_tools') {
      return [
        "**Tracking Manager** (Version: 16.0.1.1.2)",
        "Maintainers: Kev-Roche, sebastienbeau",
        "",
        "Summary:",
        "- Tracks changes across all fields of a model, including One2many and Many2many fields.",
        "",
        "Usage:",
        "- Utilized for comprehensive tracking and auditing of data changes.",
        "- Enhances data integrity and accountability within the Odoo system."
      ];
    } else {
      // Corrected block to return a warning message properly
      return [
        `Warning: The file '${fileName}' either has no content or cannot be read.`,
        "Usage: cat <file> to display the contents of a file."
      ]; // Warning message for incorrect usage or empty file
    }
  
  };

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
        terminalInstance.current.writeln(`\x1b[31m Command not found: ${input} \x1b[0m`); // Print error message in red color
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
    <PageTemplate>
      {/* Terminal container */}
      <div ref={terminalRef} className="sysadmin-terminal"></div>
    </PageTemplate>
  );
};

export default SysAdminPage;


