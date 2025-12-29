// Temporary colored rectangles for testing
export const createTempAssets = (scene) => {
    // Create player asset
    let graphics = scene.add.graphics();
    graphics.fillStyle(0x00ff00); // Green for player
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture('player', 32, 32);
    graphics.destroy();

    // Create ghost asset
    graphics = scene.add.graphics();
    graphics.fillStyle(0xff0000); // Red for ghosts
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture('ghost', 32, 32);
    graphics.destroy();

    // Create collectible assets
    graphics = scene.add.graphics();
    graphics.fillStyle(0xffff00); // Yellow for skills
    graphics.fillCircle(16, 16, 8);
    graphics.generateTexture('skill', 32, 32);
    graphics.destroy();

    // Create wall asset
    graphics = scene.add.graphics();
    graphics.fillStyle(0x0000ff); // Blue for walls
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture('wall', 32, 32);
    graphics.destroy();
}; 