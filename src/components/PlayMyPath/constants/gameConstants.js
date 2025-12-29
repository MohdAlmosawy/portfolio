export const COLLECTIBLE_TYPES = {
    SKILLS: [
        { name: 'JavaScript', points: 10, icon: 'js', description: 'Advanced JavaScript Development' },
        { name: 'Python', points: 10, icon: 'python', description: 'Python Programming' },
        { name: 'React', points: 10, icon: 'react', description: 'React Framework' },
        { name: 'Node.js', points: 10, icon: 'node', description: 'Node.js Development' },
        { name: 'MongoDB', points: 10, icon: 'mongodb', description: 'MongoDB Database' },
        { name: 'PostgreSQL', points: 10, icon: 'postgresql', description: 'PostgreSQL Database' }
    ],
    PROJECTS: [
        { 
            name: 'Access Control', 
            points: 50, 
            icon: 'lock',
            description: 'Access Control Customization Project' 
        },
        { 
            name: 'StockFlow', 
            points: 50, 
            icon: 'inventory',
            description: 'Inventory Management System' 
        },
        { 
            name: 'NFH Social', 
            points: 50, 
            icon: 'social',
            description: 'Social Media Management Platform' 
        }
    ],
    CERTIFICATIONS: [
        { 
            name: 'CCNA', 
            points: 100, 
            icon: 'cisco',
            description: 'Cisco Certified Network Associate' 
        },
        { 
            name: 'Adobe ACE', 
            points: 100, 
            icon: 'adobe',
            description: 'Adobe Certified Expert' 
        },
        { 
            name: 'Full Stack', 
            points: 100, 
            icon: 'fullstack',
            description: 'Full Stack Development Certification' 
        }
    ]
};

export const GAME_CONFIG = {
    PLAYER_SPEED: 160,
    GHOST_SPEED: 140,
    POWERUP_DURATION: 10000, // 10 seconds
    MAZE_WIDTH: 800,
    MAZE_HEIGHT: 600
};

export const GHOST_BEHAVIORS = {
    CHASE: 'chase',
    PATROL: 'patrol',
    RANDOM: 'random',
    AMBUSH: 'ambush'
};

export const SOUND_CONFIG = {
    COLLECT: {
        volume: 0.5,
        rate: 1
    },
    POWERUP: {
        volume: 0.7,
        rate: 1
    },
    GHOST_EAT: {
        volume: 0.6,
        rate: 1
    },
    BACKGROUND: {
        volume: 0.3,
        rate: 1,
        loop: true
    }
}; 