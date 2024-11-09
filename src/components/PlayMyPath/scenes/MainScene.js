import Phaser from 'phaser';
import { COLLECTIBLE_TYPES, GAME_CONFIG, GHOST_BEHAVIORS, SOUND_CONFIG } from '../constants/gameConstants';
import { createTempAssets } from '../assets/tempAssets';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.enemies = null;
        this.collectibles = null;
        this.score = 0;
        this.sounds = {};
    }

    preload() {
        // Create temporary assets
        createTempAssets(this);

        // Load audio files
        // Comment these out until we have actual audio files
        /*
        this.load.audio('background-music', '/assets/games/audio/background.mp3');
        this.load.audio('collect', '/assets/games/audio/collect.mp3');
        this.load.audio('powerup', '/assets/games/audio/powerup.mp3');
        this.load.audio('ghost-eat', '/assets/games/audio/ghost-eat.mp3');
        this.load.audio('death', '/assets/games/audio/death.mp3');
        */

        // Create a simple programmatic sprite sheet for testing
        const graphics = this.add.graphics();
        
        // Player sprite - different colors for different directions
        graphics.fillStyle(0x00ff00); // Green
        graphics.fillRect(0, 0, 32, 32);    // Down
        graphics.fillRect(0, 32, 32, 32);   // Up
        graphics.fillRect(0, 64, 32, 32);   // Left
        graphics.fillRect(0, 96, 32, 32);   // Right
        
        graphics.generateTexture('player', 32, 128);
        graphics.clear();

        // Ghost sprite - red square
        graphics.fillStyle(0xff0000);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('ghost', 32, 32);
        graphics.clear();

        // Collectible sprites
        graphics.fillStyle(0xffff00);
        graphics.fillCircle(16, 16, 8);
        graphics.generateTexture('skill', 32, 32);
        graphics.clear();

        graphics.fillStyle(0x00ffff);
        graphics.fillCircle(16, 16, 8);
        graphics.generateTexture('project', 32, 32);
        graphics.clear();

        graphics.fillStyle(0xff00ff);
        graphics.fillCircle(16, 16, 8);
        graphics.generateTexture('certification', 32, 32);
        graphics.destroy();
    }

    create() {
        // Create maze
        this.createMaze();
        
        // Create animations
        this.createAnimations();
        
        // Create player
        this.createPlayer();
        
        // Create enemies
        this.createEnemies();
        
        // Create collectibles
        this.createCollectibles();
        
        // Set up collisions
        this.setupCollisions();
        
        // Initialize sounds (with null checks)
        this.initializeSounds();
        
        // Set up camera
        this.cameras.main.startFollow(this.player);
        
        // Initialize score display
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });
        this.scoreText.setScrollFactor(0);
    }

    initializeSounds() {
        // Initialize sound objects with null checks
        try {
            if (this.game.cache.audio.has('background-music')) {
                this.sounds.background = this.sound.add('background-music', { 
                    loop: true, 
                    volume: 0.5 
                });
                this.sounds.background.play();
            }

            if (this.game.cache.audio.has('collect')) {
                this.sounds.collect = this.sound.add('collect', { volume: 0.7 });
            }

            if (this.game.cache.audio.has('powerup')) {
                this.sounds.powerup = this.sound.add('powerup', { volume: 0.7 });
            }

            if (this.game.cache.audio.has('ghost-eat')) {
                this.sounds.ghostEat = this.sound.add('ghost-eat', { volume: 0.7 });
            }

            if (this.game.cache.audio.has('death')) {
                this.sounds.death = this.sound.add('death', { volume: 0.7 });
            }
        } catch (error) {
            console.log('Audio initialization skipped - assets not available');
        }
    }

    update() {
        this.handlePlayerMovement();
        this.updateEnemies();
    }

    createMaze() {
        // Create a simple maze using code instead of a tilemap
        const walls = this.physics.add.staticGroup();
        
        // Create border walls
        for(let i = 0; i < 25; i++) {
            walls.create(i * 32, 0, 'wall');               // Top
            walls.create(i * 32, 600 - 32, 'wall');        // Bottom
            if(i < 19) {
                walls.create(0, i * 32, 'wall');           // Left
                walls.create(800 - 32, i * 32, 'wall');    // Right
            }
        }
        
        this.walls = walls;
    }

    createPlayer() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setSize(28, 28); // Adjust hitbox
    }

    createEnemies() {
        this.enemies = this.physics.add.group();
        
        // Create 4 ghosts with different behaviors
        const ghostPositions = [
            { x: 400, y: 100 },
            { x: 400, y: 500 },
            { x: 100, y: 300 },
            { x: 700, y: 300 }
        ];
        
        ghostPositions.forEach((pos, index) => {
            const ghost = this.enemies.create(pos.x, pos.y, 'ghost');
            ghost.setCollideWorldBounds(true);
            ghost.setData('behavior', this.getGhostBehavior(index));
        });
    }

    createCollectibles() {
        this.collectibles = this.physics.add.group();
        
        // Add skills
        COLLECTIBLE_TYPES.SKILLS.forEach(skill => {
            this.addCollectible('skill', skill);
        });
        
        // Add projects
        COLLECTIBLE_TYPES.PROJECTS.forEach(project => {
            this.addCollectible('project', project);
        });
        
        // Add certifications
        COLLECTIBLE_TYPES.CERTIFICATIONS.forEach(cert => {
            this.addCollectible('certification', cert);
        });
    }

    addCollectible(type, data) {
        const x = Phaser.Math.Between(50, GAME_CONFIG.MAZE_WIDTH - 50);
        const y = Phaser.Math.Between(50, GAME_CONFIG.MAZE_HEIGHT - 50);
        
        const collectible = this.collectibles.create(x, y, type);
        collectible.setData('type', type);
        collectible.setData('info', data);
        collectible.setScale(0.75); // Adjust size if needed
    }

    setupCollisions() {
        // Player collisions
        this.physics.add.collider(this.player, this.walls);
        
        // Enemy collisions
        this.physics.add.collider(this.enemies, this.walls);
        this.physics.add.collider(this.enemies, this.enemies);
        
        // Collectible interactions
        this.physics.add.overlap(
            this.player,
            this.collectibles,
            this.collectItem,
            null,
            this
        );
        
        // Enemy interactions
        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.handleEnemyCollision,
            null,
            this
        );
    }

    handlePlayerMovement() {
        const cursors = this.input.keyboard.createCursorKeys();
        const speed = 160;
        
        // Reset velocity
        this.player.setVelocity(0);
        
        // Horizontal movement
        if (cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.setTexture('player', 2); // Use frame directly instead of animation
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.setTexture('player', 3);
        }
        
        // Vertical movement
        if (cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.player.setTexture('player', 1);
        } else if (cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.player.setTexture('player', 0);
        }
        
        // If not moving, use idle frame
        if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
            this.player.setTexture('player', 0);
        }
    }

    updateEnemies() {
        this.enemies.getChildren().forEach(ghost => {
            const behavior = ghost.getData('behavior');
            if (behavior && behavior.update) {
                behavior.update(ghost, this.player);
            }
        });
    }

    collectItem(player, collectible) {
        const type = collectible.getData('type');
        const info = collectible.getData('info') || {
            name: type.charAt(0).toUpperCase() + type.slice(1),
            points: type === 'skill' ? 10 : type === 'project' ? 50 : 100,
            description: `Collected a ${type}!`
        };
        
        // Update score based on type
        switch(type) {
            case 'skill':
                this.score += 10;
                if (this.sounds.collect) this.sounds.collect.play();
                break;
            case 'project':
                this.score += 50;
                if (this.sounds.collect) this.sounds.collect.play();
                break;
            case 'certification':
                this.score += 100;
                if (this.sounds.powerup) this.sounds.powerup.play();
                break;
            default:
                this.score += 5;
                break;
        }
        
        // Update score display
        this.scoreText.setText(`Score: ${this.score}`);
        
        // Show info popup
        this.showInfoPopup(info);
        
        // Remove collectible
        collectible.destroy();
    }

    handleEnemyCollision(player, enemy) {
        if (!player.getData('powered')) {
            if (this.sounds.death) this.sounds.death.play();
            this.gameOver();
        } else {
            if (this.sounds.ghostEat) this.sounds.ghostEat.play();
            enemy.destroy();
        }
    }

    gameOver() {
        this.scene.pause();
        // Show game over screen with final score
        this.events.emit('gameOver', this.score);
    }

    getGhostBehavior(index) {
        const behaviors = [
            {
                name: 'chase',
                update: (ghost, player) => {
                    const speed = 140;
                    const angle = Phaser.Math.Angle.Between(
                        ghost.x, ghost.y,
                        player.x, player.y
                    );
                    ghost.setVelocity(
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed
                    );
                }
            },
            {
                name: 'patrol',
                update: (ghost) => {
                    if (!ghost.getData('patrolPoints')) {
                        ghost.setData('patrolPoints', [
                            { x: ghost.x + 100, y: ghost.y },
                            { x: ghost.x, y: ghost.y + 100 },
                            { x: ghost.x - 100, y: ghost.y },
                            { x: ghost.x, y: ghost.y - 100 }
                        ]);
                        ghost.setData('currentPoint', 0);
                    }

                    const points = ghost.getData('patrolPoints');
                    const currentPoint = ghost.getData('currentPoint');
                    const target = points[currentPoint];
                    const speed = 120;
                    const angle = Phaser.Math.Angle.Between(
                        ghost.x, ghost.y,
                        target.x, target.y
                    );

                    ghost.setVelocity(
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed
                    );

                    // Check if ghost reached the current point
                    const distance = Phaser.Math.Distance.Between(
                        ghost.x, ghost.y,
                        target.x, target.y
                    );
                    if (distance < 5) {
                        ghost.setData('currentPoint', (currentPoint + 1) % points.length);
                    }
                }
            },
            {
                name: 'random',
                update: (ghost) => {
                    if (!ghost.getData('moveTimer') || ghost.getData('moveTimer') <= 0) {
                        const angle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360));
                        const speed = 100;
                        ghost.setVelocity(
                            Math.cos(angle) * speed,
                            Math.sin(angle) * speed
                        );
                        ghost.setData('moveTimer', Phaser.Math.Between(2000, 4000));
                    }
                    ghost.setData('moveTimer', ghost.getData('moveTimer') - 16);
                }
            },
            {
                name: 'ambush',
                update: (ghost, player) => {
                    const speed = 130;
                    const predictedX = player.x + (player.body.velocity.x * 2);
                    const predictedY = player.y + (player.body.velocity.y * 2);
                    const angle = Phaser.Math.Angle.Between(
                        ghost.x, ghost.y,
                        predictedX, predictedY
                    );
                    ghost.setVelocity(
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed
                    );
                }
            }
        ];
        return behaviors[index % behaviors.length];
    }

    createAnimations() {
        // Player animations using single frames for each direction
        this.anims.create({
            key: 'walk-down',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'walk-up',
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'walk-left',
            frames: [{ key: 'player', frame: 2 }],
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'walk-right',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 1,
            repeat: 0
        });

        // Simple ghost animation
        this.anims.create({
            key: 'ghost-move',
            frames: [{ key: 'ghost', frame: 0 }],
            frameRate: 1,
            repeat: 0
        });
    }

    showInfoPopup(info) {
        // Remove existing popup if there is one
        if (this.currentPopup) {
            this.currentPopup.destroy(true);
        }

        // Create popup container
        const popup = this.add.container(400, 300);
        this.currentPopup = popup;

        // Background
        const bg = this.add.rectangle(0, 0, 300, 150, 0x000000, 0.8);
        bg.setStrokeStyle(2, 0xffffff);
        popup.add(bg);

        // Title
        const title = this.add.text(0, -50, info.name, {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center'
        });
        title.setOrigin(0.5);
        popup.add(title);

        // Points
        const points = this.add.text(0, -20, `+${info.points} points`, {
            fontSize: '20px',
            fill: '#00ff00',
            align: 'center'
        });
        points.setOrigin(0.5);
        popup.add(points);

        // Description
        const description = this.add.text(0, 10, info.description, {
            fontSize: '16px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 280 }
        });
        description.setOrigin(0.5);
        popup.add(description);

        // Make popup follow camera
        popup.setScrollFactor(0);

        // Animate popup
        this.tweens.add({
            targets: popup,
            scaleX: { from: 0, to: 1 },
            scaleY: { from: 0, to: 1 },
            alpha: { from: 0, to: 1 },
            duration: 200,
            ease: 'Back.out',
            onComplete: () => {
                // Auto-hide popup after 2 seconds
                this.time.delayedCall(2000, () => {
                    this.tweens.add({
                        targets: popup,
                        alpha: 0,
                        y: popup.y - 50,
                        duration: 200,
                        ease: 'Power2',
                        onComplete: () => {
                            popup.destroy(true);
                            this.currentPopup = null;
                        }
                    });
                });
            }
        });
    }
} 