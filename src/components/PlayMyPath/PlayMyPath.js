import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import PageTemplate from '../PageTemplate/PageTemplate';
import { MainScene } from './scenes/MainScene';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Info, Trophy, RotateCcw } from 'lucide-react';
import './PlayMyPath.css';

const PlayMyPath = () => {
    const [game, setGame] = useState(null);
    const [showInstructions, setShowInstructions] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    useEffect(() => {
        const cleanup = () => {
            if (game) {
                game.destroy(true);
                setGame(null);
            }
        };

        if (!showInstructions && !game && !gameOver) {
            const config = {
                type: Phaser.AUTO,
                parent: 'game-container',
                width: 800,
                height: 600,
                backgroundColor: '#000000',
                scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                },
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 0 },
                        debug: false
                    }
                },
                scene: MainScene
            };

            try {
                const newGame = new Phaser.Game(config);
                setGame(newGame);

                // Listen for game over event
                window.addEventListener('gameOver', (e) => {
                    setFinalScore(e.detail.score);
                    setGameOver(true);
                });
            } catch (error) {
                console.error('Failed to create game:', error);
            }
        }

        return cleanup;
    }, [showInstructions, game, gameOver]);

    const handleRestart = () => {
        setGameOver(false);
        setFinalScore(0);
    };

    return (
        <PageTemplate>
            <div className="play-my-path">
                <AnimatePresence mode="wait">
                    {showInstructions ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="instructions"
                        >
                            <div className="instructions-content">
                                <Gamepad2 size={48} className="instructions-icon" />
                                <h1>Welcome to Play My Path!</h1>
                                <p>Explore my professional journey through this Pac-Man inspired game.</p>
                                <div className="controls">
                                    <h2>How to Play:</h2>
                                    <ul>
                                        <li>🎮 Use arrow keys to move</li>
                                        <li>💡 Collect yellow dots for skills (10 points)</li>
                                        <li>📋 Collect cyan dots for projects (50 points)</li>
                                        <li>🏆 Collect magenta dots for certifications (100 points)</li>
                                        <li>👻 Avoid the red ghosts!</li>
                                    </ul>
                                </div>
                                <button 
                                    className="start-button"
                                    onClick={() => setShowInstructions(false)}
                                >
                                    Start Game
                                </button>
                            </div>
                        </motion.div>
                    ) : gameOver ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="game-over"
                        >
                            <div className="game-over-content">
                                <Trophy size={48} className="game-over-icon" />
                                <h1>Game Over!</h1>
                                <div className="score-display">
                                    <h2>Final Score</h2>
                                    <p className="score">{finalScore}</p>
                                </div>
                                <div className="game-over-buttons">
                                    <button 
                                        className="restart-button"
                                        onClick={handleRestart}
                                    >
                                        <RotateCcw size={20} />
                                        <span>Play Again</span>
                                    </button>
                                    <button 
                                        className="instructions-button"
                                        onClick={() => setShowInstructions(true)}
                                    >
                                        <Info size={20} />
                                        <span>Instructions</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="game-wrapper"
                        >
                            <div id="game-container"></div>
                            <button
                                className="instructions-button"
                                onClick={() => setShowInstructions(true)}
                            >
                                <Info size={20} />
                                <span>Instructions</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageTemplate>
    );
};

export default PlayMyPath;