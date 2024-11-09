import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.score = 0;
        this.gameOver = false;
        this.playerSpeed = 3; // Cells per second
        this.cellSize = 32;        // Add cell size
        this.isometricAngle = 30;  // Add isometric angle
    }

    create() {
        // Initialize game state
        this.initializeMaze();
        this.initializeInput();
        
        // Create score display
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });
        this.scoreText.setScrollFactor(0);

        // Add render call after initialization
        this.renderGame();
    }

    initializeInput() {
        // Set up keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.gameOver) return;

        // Handle player movement
        this.handlePlayerMovement();
        
        // Check collisions
        this.checkDotCollection();
        this.checkGhostCollision();
        
        // Update ghost movement
        this.updateGhosts();
    }

    handlePlayerMovement() {
        let nextX = this.player.x;
        let nextY = this.player.y;

        if (this.cursors.left.isDown) {
            nextX -= this.playerSpeed * (1/60);
        } else if (this.cursors.right.isDown) {
            nextX += this.playerSpeed * (1/60);
        }

        if (this.cursors.up.isDown) {
            nextY -= this.playerSpeed * (1/60);
        } else if (this.cursors.down.isDown) {
            nextY += this.playerSpeed * (1/60);
        }

        // Check if next position is valid (not a wall)
        if (this.isValidPosition(nextX, nextY)) {
            this.player.x = nextX;
            this.player.y = nextY;
        }
    }

    isValidPosition(x, y) {
        // Convert position to maze coordinates
        const cellX = Math.floor(x);
        const cellY = Math.floor(y);
        
        // Check bounds
        if (cellX < 0 || cellX >= this.maze[0].length || 
            cellY < 0 || cellY >= this.maze.length) {
            return false;
        }
        
        // Check if position is a wall
        return this.maze[cellY][cellX] !== 1;
    }

    checkDotCollection() {
        const cellX = Math.floor(this.player.x);
        const cellY = Math.floor(this.player.y);

        if (this.maze[cellY][cellX] === 0) {
            // Collect dot
            this.maze[cellY][cellX] = 2; // Mark as collected
            this.score += 10;
            this.scoreText.setText(`Score: ${this.score}`);
            
            // Check if all dots are collected
            if (this.checkWinCondition()) {
                this.gameWon();
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
        // Classic PacMan maze layout (1 for walls, 0 for paths)
        this.maze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
            [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
            [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
            [1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1],
            [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0], // Ghost pen row
            [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
            [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
            [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
            [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
            [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
            [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        // Initialize player position
        this.player = {
            x: 9,    // Center of maze
            y: 15,   // Lower position for start
            angle: 0
        };

        // Initialize ghosts in the pen
        this.ghosts = [
            { x: 8, y: 8, color: 0xFF0000 },  // Red ghost
            { x: 9, y: 8, color: 0xFFB8FF },  // Pink ghost
            { x: 10, y: 8, color: 0x00FFFF }, // Cyan ghost
            { x: 9, y: 9, color: 0xFFA500 }   // Orange ghost
        ];

        // Create ALL graphics objects for rendering
        this.wallsGraphics = this.add.graphics();
        this.dotsGraphics = this.add.graphics();
        this.entitiesGraphics = this.add.graphics();
        this.glowGraphics = this.add.graphics();
    }

    renderGame() {
        // Clear all graphics
        this.wallsGraphics.clear();
        this.dotsGraphics.clear();
        this.entitiesGraphics.clear();
        this.glowGraphics.clear();

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
        const isoX = (x - y) * Math.cos(this.isometricAngle * Math.PI / 180);
        const isoY = ((x + y) * Math.sin(this.isometricAngle * Math.PI / 180));
        
        return {
            x: (isoX * this.cellSize) + this.game.config.width / 2,
            y: (isoY * this.cellSize) + this.game.config.height / 4
        };
    }

    renderDots() {
        this.dotsGraphics.fillStyle(0xFFFFFF, 1);
        
        this.maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 0) {  // Uncollected dot
                    // Get isometric position
                    const pos = this.toIsometric(x, y);
                    
                    // Draw dot with glow effect
                    // Outer glow
                    this.glowGraphics.fillStyle(0xFFFFFF, 0.2);
                    this.glowGraphics.fillCircle(pos.x, pos.y, 4);
                    
                    // Inner bright dot
                    this.dotsGraphics.fillStyle(0xFFFFFF, 1);
                    this.dotsGraphics.fillCircle(pos.x, pos.y, 2);
                }
            });
        });

        // Add power pellets with bigger dots and stronger glow
        const powerPellets = [
            {x: 1, y: 1},    // Top-left
            {x: 17, y: 1},   // Top-right
            {x: 1, y: 17},   // Bottom-left
            {x: 17, y: 17}   // Bottom-right
        ];

        powerPellets.forEach(pellet => {
            const pos = this.toIsometric(pellet.x, pellet.y);
            
            // Power pellet glow
            this.glowGraphics.fillStyle(0xFFFFFF, 0.3);
            this.glowGraphics.fillCircle(pos.x, pos.y, 8);
            
            // Power pellet dot
            this.dotsGraphics.fillStyle(0xFFFFFF, 1);
            this.dotsGraphics.fillCircle(pos.x, pos.y, 4);
        });
    }

    renderEntities() {
        this.entitiesGraphics.clear();
        
        // Render Pac-Man
        const pacmanX = this.player.x * 32 + 16;
        const pacmanY = this.player.y * 32 + 16;
        this.entitiesGraphics.fillStyle(0xFFFF00, 1);
        this.entitiesGraphics.fillCircle(pacmanX, pacmanY, 16);
    }
} 