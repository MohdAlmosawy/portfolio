import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.score = 0;
        this.gameOver = false;
        this.playerSpeed = 0.15;
        this.cellSize = 24;
        this.isometricAngle = 30;

        // Define dot types and their values
        this.dotTypes = {
            EMPTY: 0,
            WALL: 1,
            COLLECTED: 2,
            CORE_SKILL: 3,     // Standard dots with different icons
            CCNA_CERT: 4,      // Power pellet - Cisco
            ADOBE_CERT: 5,     // Power pellet - Adobe
            GRADUATION: 6,     // Power pellet - Education
            ACCESS_PROJ: 7,    // Fruit - Access Control
            STOCK_PROJ: 8,     // Fruit - StockFlow
            TICKET_PROJ: 9     // Fruit - AthloTix
        };

        // Define scoring for different items
        this.scoreValues = {
            CORE_SKILL: 10,
            CCNA_CERT: 50,
            ADOBE_CERT: 50,
            GRADUATION: 50,
            ACCESS_PROJ: 100,
            STOCK_PROJ: 150,
            TICKET_PROJ: 200
        };

        // Add power mode properties
        this.isPowerMode = false;
        this.powerModeTimer = null;
        this.powerModeDuration = 10000; // 10 seconds

        // Add achievement descriptions
        this.achievementInfo = {
            CCNA_CERT: {
                title: "CCNA Certification",
                description: "Cisco Certified Network Associate certification, demonstrating networking expertise.",
                year: "2019",
                icon: "🌐"
            },
            ADOBE_CERT: {
                title: "Adobe Certified Expert",
                description: "Professional certification in Adobe Creative Suite, showcasing design capabilities.",
                year: "2020",
                icon: "🎨"
            },
            GRADUATION: {
                title: "Bachelor's in Information Systems",
                description: "Comprehensive education in IT systems and business processes.",
                year: "2018",
                icon: "🎓"
            },
            ACCESS_PROJ: {
                title: "Access Control System",
                description: "Developed a custom access control solution for Ghost Computers.",
                tech: "Python, RFID, SQL",
                icon: "🔐"
            },
            STOCK_PROJ: {
                title: "StockFlow Inventory",
                description: "Created an automated inventory management system.",
                tech: "Odoo, Python, PostgreSQL",
                icon: "📦"
            },
            TICKET_PROJ: {
                title: "AthloTix Ticketing",
                description: "Built a scalable event ticketing platform.",
                tech: "Node.js, React, MongoDB",
                icon: "🎟️"
            }
        };

        // Track collected achievements
        this.collectedAchievements = new Set();
    }

    create() {
        this.initializeMaze();
        this.initializeInput();
        this.cameras.main.setBackgroundColor(0x000000);

        // Calculate the center point of the maze in grid coordinates
        const mazeCenterX = (this.maze[0].length - 1) / 2;
        const mazeCenterY = (this.maze.length - 1) / 2;
        
        // Convert to isometric coordinates
        const centerPos = this.toIsometric(mazeCenterX, mazeCenterY);
        
        // Center the camera on the maze center
        this.cameras.main.centerOn(centerPos.x, centerPos.y);

        // Add score text
        this.scoreText = this.add.text(
            this.game.config.width * 0.05, 
            this.game.config.height * 0.05, 
            'Score: 0', 
            {
                fontSize: '32px',
                fill: '#fff'
            }
        );
        this.scoreText.setScrollFactor(0);
        this.scoreText.setDepth(1);

        this.renderGame();
    }

    initializeInput() {
        // Set up keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.currentDirection = { x: 0, y: 0 };
        this.nextDirection = { x: 0, y: 0 };
    }

    update() {
        if (!this.gameOver) {
            this.handlePlayerMovement();
            this.checkDotCollection();
            this.renderGame();
        }
    }

    handlePlayerMovement() {
        // Get input
        if (this.cursors.left.isDown) {
            this.nextDirection = { x: -1, y: 0 };
        } else if (this.cursors.right.isDown) {
            this.nextDirection = { x: 1, y: 0 };
        } else if (this.cursors.up.isDown) {
            this.nextDirection = { x: 0, y: -1 };
        } else if (this.cursors.down.isDown) {
            this.nextDirection = { x: 0, y: 1 };
        }

        // Calculate next position
        const nextX = this.player.x + (this.nextDirection.x * this.playerSpeed);
        const nextY = this.player.y + (this.nextDirection.y * this.playerSpeed);

        // Try moving in the next direction
        if (this.isValidPosition(nextX, nextY)) {
            this.player.x = nextX;
            this.player.y = nextY;
            this.currentDirection = { ...this.nextDirection };
        } else {
            // Try continuing in current direction
            const currentX = this.player.x + (this.currentDirection.x * this.playerSpeed);
            const currentY = this.player.y + (this.currentDirection.y * this.playerSpeed);
            
            if (this.isValidPosition(currentX, currentY)) {
                this.player.x = currentX;
                this.player.y = currentY;
            }
        }

        // Handle tunnel wrapping
        if (this.player.x < 0) {
            this.player.x = this.maze[0].length - 1;
        } else if (this.player.x >= this.maze[0].length) {
            this.player.x = 0;
        }
    }

    isValidPosition(x, y) {
        const gridX = Math.floor(x);
        const gridY = Math.floor(y);
        
        // Check vertical bounds
        if (gridY < 0 || gridY >= this.maze.length) {
            return false;
        }
        
        // Handle horizontal wrapping for tunnels
        let checkX = gridX;
        if (gridX < 0) {
            checkX = this.maze[0].length - 1;
        } else if (gridX >= this.maze[0].length) {
            checkX = 0;
        }
        
        // Check if position is a wall
        return this.maze[gridY][checkX] !== 1;
    }

    checkDotCollection() {
        const gridX = Math.floor(this.player.x);
        const gridY = Math.floor(this.player.y);

        let checkX = gridX;
        if (gridX < 0) checkX = this.maze[0].length - 1;
        if (gridX >= this.maze[0].length) checkX = 0;

        const dotType = this.maze[gridY][checkX];
        if (dotType !== this.dotTypes.WALL && dotType !== this.dotTypes.COLLECTED) {
            // Add score
            this.score += this.scoreValues[Object.keys(this.dotTypes)[dotType]] || 0;
            this.scoreText.setText(`Score: ${this.score}`);
            
            // Show achievement info for special items
            if (dotType >= this.dotTypes.CCNA_CERT) {
                if (!this.collectedAchievements.has(dotType)) {
                    this.showAchievementInfo(dotType);
                    this.collectedAchievements.add(dotType);
                }
            }

            // Mark as collected
            this.maze[gridY][checkX] = this.dotTypes.COLLECTED;

            // Handle power mode
            if ([this.dotTypes.CCNA_CERT, this.dotTypes.ADOBE_CERT, 
                 this.dotTypes.GRADUATION].includes(dotType)) {
                this.activatePowerMode();
            }
        }
    }

    checkGhostCollision() {
        this.ghosts.forEach(ghost => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                ghost.x, ghost.y
            );
            
            if (distance < 0.5) { // Collision threshold
                this.gameOver = true;
                this.handleGameOver();
            }
        });
    }

    updateGhosts() {
        this.ghosts.forEach(ghost => {
            // Simple ghost AI - move towards player
            const angle = Phaser.Math.Angle.Between(
                ghost.x, ghost.y,
                this.player.x, this.player.y
            );
            
            const ghostSpeed = 2; // Cells per second
            ghost.x += Math.cos(angle) * ghostSpeed * (1/60);
            ghost.y += Math.sin(angle) * ghostSpeed * (1/60);
        });
    }

    checkWinCondition() {
        return this.maze.every(row => 
            row.every(cell => cell !== 0)
        );
    }

    handleGameOver() {
        this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2,
            'Game Over!\nClick to restart',
            {
                fontSize: '48px',
                fill: '#fff',
                align: 'center'
            }
        ).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.restart();
        });
    }

    initializeMaze() {
        // Initialize base maze with walls (1) and paths (0)
        this.maze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,4,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,5,1], // CCNA & Adobe certs at corners
            [1,3,1,1,3,1,1,1,3,1,3,1,1,1,3,1,1,3,1],
            [1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,3,1,1,3,1,3,1,1,1,1,1,3,1,3,1,1,3,1],
            [1,3,3,3,3,1,3,3,3,1,3,3,3,1,3,3,3,3,1],
            [1,1,1,1,3,1,1,1,0,1,0,1,1,1,3,1,1,1,1],
            [1,1,1,1,3,1,3,3,3,3,3,3,3,1,3,1,1,1,1],
            [1,1,1,1,3,1,3,1,1,0,1,1,3,1,3,1,1,1,1],
            [0,3,3,3,3,3,3,1,0,0,0,1,3,3,3,3,3,3,0],
            [1,1,1,1,3,1,3,1,1,1,1,1,3,1,3,1,1,1,1],
            [1,1,1,1,3,1,3,3,3,3,3,3,3,1,3,1,1,1,1],
            [1,1,1,1,3,1,3,1,1,1,1,1,3,1,3,1,1,1,1],
            [1,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,1],
            [1,3,1,1,3,1,1,1,3,1,3,1,1,1,3,1,1,3,1],
            [1,3,3,1,3,3,3,3,3,3,3,3,3,3,3,1,3,3,1],
            [1,1,3,1,3,1,3,1,1,1,1,1,3,1,3,1,3,1,1],
            [1,6,3,3,3,1,3,3,3,1,3,3,3,1,3,3,3,6,1], // Graduation caps at corners
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        // Add special project items (fruits) at specific locations
        this.specialItems = [
            { type: this.dotTypes.ACCESS_PROJ, x: 9, y: 7 },
            { type: this.dotTypes.STOCK_PROJ, x: 9, y: 10 },
            { type: this.dotTypes.TICKET_PROJ, x: 5, y: 9 }
        ];

        // Initialize player
        this.player = {
            x: 9.0,
            y: 15.0,
            angle: 0
        };

        // Initialize graphics objects
        this.wallsGraphics = this.add.graphics();
        this.dotsGraphics = this.add.graphics();
        this.entitiesGraphics = this.add.graphics();
        this.glowGraphics = this.add.graphics();
        this.specialGraphics = this.add.graphics();
    }

    renderGame() {
        // Clear all graphics
        this.wallsGraphics.clear();
        this.dotsGraphics.clear();
        this.entitiesGraphics.clear();
        this.glowGraphics.clear();
        this.specialGraphics.clear();

        // Render all elements with isometric perspective
        this.renderWalls();
        this.renderDots();
        this.renderEntities();
    }

    renderWalls() {
        this.wallsGraphics.lineStyle(3, 0x00BFFF, 1);
        
        this.maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    const pos = this.toIsometric(x, y);
                    
                    // Draw neon wall effect
                    // Outer glow
                    this.glowGraphics.lineStyle(6, 0x00BFFF, 0.2);
                    this.drawIsometricWall(pos.x, pos.y, x, y);
                    
                    // Inner bright line
                    this.wallsGraphics.lineStyle(2, 0x00BFFF, 1);
                    this.drawIsometricWall(pos.x, pos.y, x, y);
                }
            });
        });
    }

    drawIsometricWall(x, y, gridX, gridY) {
        const wallThickness = this.cellSize * 0.15;  // Thin neon lines
        const width = this.cellSize;
        
        // Check neighboring cells safely
        const hasTop = gridY > 0 && this.maze[gridY-1][gridX] === 1;
        const hasBottom = gridY < this.maze.length-1 && this.maze[gridY+1][gridX] === 1;
        const hasLeft = gridX > 0 && this.maze[gridY][gridX-1] === 1;
        const hasRight = gridX < this.maze[0].length-1 && this.maze[gridY][gridX+1] === 1;

        // Calculate next positions using isometric projection
        const rightPos = this.toIsometric(gridX + 1, gridY);
        const bottomPos = this.toIsometric(gridX, gridY + 1);

        if (hasLeft || hasRight) {
            this.wallsGraphics.beginPath();
            this.wallsGraphics.moveTo(x, y);
            this.wallsGraphics.lineTo(rightPos.x, rightPos.y);
            this.wallsGraphics.strokePath();
        }

        if (hasTop || hasBottom) {
            this.wallsGraphics.beginPath();
            this.wallsGraphics.moveTo(x, y);
            this.wallsGraphics.lineTo(bottomPos.x, bottomPos.y);
            this.wallsGraphics.strokePath();
        }
    }

    toIsometric(x, y) {
        // Convert grid coordinates to isometric coordinates
        const isoX = (x - y) * Math.cos(this.isometricAngle * Math.PI / 180);
        const isoY = (x + y) * Math.sin(this.isometricAngle * Math.PI / 180);
        
        // Center in the viewport
        return {
            x: (isoX * this.cellSize) + (this.game.config.width / 2),
            y: (isoY * this.cellSize) + (this.game.config.height / 2)
        };
    }

    renderDots() {
        this.dotsGraphics.clear();
        
        this.maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== this.dotTypes.WALL && cell !== this.dotTypes.COLLECTED) {
                    const pos = this.toIsometric(x, y);
                    
                    switch(cell) {
                        case this.dotTypes.CORE_SKILL:
                            this.renderCoreSkill(pos.x, pos.y);
                            break;
                        case this.dotTypes.CCNA_CERT:
                            this.renderCCNACert(pos.x, pos.y);
                            break;
                        case this.dotTypes.ADOBE_CERT:
                            this.renderAdobeCert(pos.x, pos.y);
                            break;
                        case this.dotTypes.GRADUATION:
                            this.renderGraduation(pos.x, pos.y);
                            break;
                        case this.dotTypes.ACCESS_PROJ:
                            this.renderAccessProject(pos.x, pos.y);
                            break;
                        case this.dotTypes.STOCK_PROJ:
                            this.renderStockProject(pos.x, pos.y);
                            break;
                        case this.dotTypes.TICKET_PROJ:
                            this.renderTicketProject(pos.x, pos.y);
                            break;
                    }
                }
            });
        });
    }

    renderCoreSkill(x, y) {
        // Core skill dot with code bracket symbol
        this.dotsGraphics.lineStyle(1, 0xFFFFFF);
        this.dotsGraphics.strokeCircle(x, y, 4);
        this.dotsGraphics.fillStyle(0xFFFFFF, 1);
        this.dotsGraphics.fillCircle(x, y, 2);
    }

    renderCCNACert(x, y) {
        // CCNA certification power pellet
        this.glowGraphics.fillStyle(0x00BFFF, 0.3);
        this.glowGraphics.fillCircle(x, y, 8);
        this.dotsGraphics.fillStyle(0x00BFFF, 1);
        this.dotsGraphics.fillCircle(x, y, 6);
    }

    renderAdobeCert(x, y) {
        // Adobe certification power pellet
        this.glowGraphics.fillStyle(0xFF0000, 0.3);
        this.glowGraphics.fillCircle(x, y, 8);
        this.dotsGraphics.fillStyle(0xFF0000, 1);
        this.dotsGraphics.fillCircle(x, y, 6);
    }

    renderGraduation(x, y) {
        // Graduation power pellet
        this.glowGraphics.fillStyle(0xFFD700, 0.3);
        this.glowGraphics.fillCircle(x, y, 8);
        this.dotsGraphics.fillStyle(0xFFD700, 1);
        this.dotsGraphics.fillCircle(x, y, 6);
    }

    renderEntities() {
        this.entitiesGraphics.clear();
        
        // Get isometric position for Pac-Man
        const pacmanPos = this.toIsometric(this.player.x, this.player.y);
        
        // Render glow (enhanced during power mode)
        const glowAlpha = this.isPowerMode ? 0.5 : 0.3;
        const glowSize = this.isPowerMode ? 12 : 10;
        this.glowGraphics.fillStyle(0xFFFF00, glowAlpha);
        this.glowGraphics.fillCircle(pacmanPos.x, pacmanPos.y, glowSize);
        
        // Render Pac-Man (slightly larger during power mode)
        this.entitiesGraphics.fillStyle(0xFFFF00, 1);
        this.entitiesGraphics.fillCircle(pacmanPos.x, pacmanPos.y, 
            this.isPowerMode ? 10 : 8);
    }

    renderAccessProject(x, y) {
        // Key symbol for Access Control project
        this.glowGraphics.fillStyle(0x00FF00, 0.3);
        this.glowGraphics.fillCircle(x, y, 10);
        
        // Draw key symbol
        this.specialGraphics.lineStyle(2, 0x00FF00);
        this.specialGraphics.beginPath();
        this.specialGraphics.arc(x, y, 6, 0, Math.PI * 2);
        this.specialGraphics.moveTo(x + 6, y);
        this.specialGraphics.lineTo(x + 12, y);
        this.specialGraphics.strokePath();
    }

    renderStockProject(x, y) {
        // Barcode symbol for StockFlow project
        this.glowGraphics.fillStyle(0x0000FF, 0.3);
        this.glowGraphics.fillCircle(x, y, 10);
        
        // Draw simplified barcode
        this.specialGraphics.lineStyle(2, 0x0000FF);
        for(let i = -6; i <= 6; i += 3) {
            this.specialGraphics.beginPath();
            this.specialGraphics.moveTo(x + i, y - 6);
            this.specialGraphics.lineTo(x + i, y + 6);
            this.specialGraphics.strokePath();
        }
    }

    renderTicketProject(x, y) {
        // Ticket symbol for AthloTix project
        this.glowGraphics.fillStyle(0xFF00FF, 0.3);
        this.glowGraphics.fillCircle(x, y, 10);
        
        // Draw ticket shape
        this.specialGraphics.lineStyle(2, 0xFF00FF);
        this.specialGraphics.strokeRect(x - 6, y - 4, 12, 8);
        this.specialGraphics.beginPath();
        this.specialGraphics.moveTo(x, y - 4);
        this.specialGraphics.lineTo(x, y + 4);
        this.specialGraphics.strokePath();
    }

    activatePowerMode() {
        // Clear existing timer if there is one
        if (this.powerModeTimer) {
            clearTimeout(this.powerModeTimer);
        }

        // Activate power mode
        this.isPowerMode = true;

        // Add visual feedback
        this.player.powerMode = true;
        
        // Optional: Add visual effect to player
        this.glowGraphics.fillStyle(0xFFFF00, 0.5);
        
        // Set timer to deactivate power mode
        this.powerModeTimer = setTimeout(() => {
            this.deactivatePowerMode();
        }, this.powerModeDuration);

        // Optional: Add power mode indicator
        if (this.powerModeText) {
            this.powerModeText.destroy();
        }
        this.powerModeText = this.add.text(
            this.game.config.width * 0.05,
            this.game.config.height * 0.1,
            'POWER MODE!',
            {
                fontSize: '24px',
                fill: '#FFD700',
                fontStyle: 'bold'
            }
        );
        this.powerModeText.setScrollFactor(0);
        this.powerModeText.setDepth(1);
    }

    deactivatePowerMode() {
        this.isPowerMode = false;
        this.player.powerMode = false;
        
        // Remove power mode indicator
        if (this.powerModeText) {
            this.powerModeText.destroy();
            this.powerModeText = null;
        }

        // Clear the timer
        if (this.powerModeTimer) {
            clearTimeout(this.powerModeTimer);
            this.powerModeTimer = null;
        }
    }

    showAchievementInfo(type) {
        const info = this.achievementInfo[Object.keys(this.dotTypes)[type]];
        if (!info) return;

        // Create achievement display at the very bottom of the viewport
        const achievementDisplay = this.add.container(
            this.game.config.width * 0.5,  // Center horizontally
            this.game.config.height - 30    // Position at very bottom with small padding
        );

        // Background panel (single line)
        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.9);
        panel.fillRoundedRect(-300, -20, 600, 40, 8);  // Slightly smaller height
        panel.lineStyle(2, 0xFFD700);
        panel.strokeRoundedRect(-300, -20, 600, 40, 8);

        // Single line achievement content
        const content = this.add.text(-290, -12,  // Adjusted text position
            `${info.icon} ${info.title} - ${info.year ? `Year: ${info.year}` : `Tech: ${info.tech}`}`, {
            fontSize: '18px',  // Slightly smaller font
            fill: '#FFD700',
            fontStyle: 'bold'
        });

        achievementDisplay.add([panel, content]);
        achievementDisplay.setDepth(100);
        achievementDisplay.setScrollFactor(0);  // Ensure it stays fixed on screen

        // Animate display from below screen
        this.tweens.add({
            targets: achievementDisplay,
            alpha: { from: 0, to: 1 },
            y: { from: this.game.config.height + 40, to: this.game.config.height - 30 },
            duration: 500,
            ease: 'Power2'
        });

        // Auto-hide with slide-down
        setTimeout(() => {
            this.tweens.add({
                targets: achievementDisplay,
                alpha: 0,
                y: this.game.config.height + 40,
                duration: 500,
                ease: 'Power2',
                onComplete: () => achievementDisplay.destroy()
            });
        }, 5000);
    }
} 