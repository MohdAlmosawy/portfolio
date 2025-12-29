export class GhostBehaviors {
    static chasePlayer(ghost, player) {
        const speed = 140;
        const angle = Phaser.Math.Angle.Between(
            ghost.x, ghost.y,
            player.x, player.y
        );

        ghost.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );

        // Update ghost animation based on direction
        this.updateGhostAnimation(ghost);
    }

    static patrolArea(ghost) {
        if (!ghost.patrolPoints) {
            // Define patrol points if not set
            ghost.patrolPoints = [
                { x: ghost.x + 100, y: ghost.y },
                { x: ghost.x, y: ghost.y + 100 },
                { x: ghost.x - 100, y: ghost.y },
                { x: ghost.x, y: ghost.y - 100 }
            ];
            ghost.currentPoint = 0;
        }

        const target = ghost.patrolPoints[ghost.currentPoint];
        const distance = Phaser.Math.Distance.Between(
            ghost.x, ghost.y,
            target.x, target.y
        );

        if (distance < 5) {
            ghost.currentPoint = (ghost.currentPoint + 1) % ghost.patrolPoints.length;
        }

        const speed = 120;
        const angle = Phaser.Math.Angle.Between(
            ghost.x, ghost.y,
            target.x, target.y
        );

        ghost.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
    }

    static randomMovement(ghost) {
        if (!ghost.moveTimer || ghost.moveTimer <= 0) {
            const angle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360));
            const speed = 100;

            ghost.setVelocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );

            ghost.moveTimer = Phaser.Math.Between(2000, 4000);
        }

        ghost.moveTimer -= 16; // Assuming 60fps
    }

    static ambushPlayer(ghost, player) {
        // Predict player's position based on their velocity
        const predictedX = player.x + player.body.velocity.x;
        const predictedY = player.y + player.body.velocity.y;

        const speed = 130;
        const angle = Phaser.Math.Angle.Between(
            ghost.x, ghost.y,
            predictedX, predictedY
        );

        ghost.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
    }

    static updateGhostAnimation(ghost) {
        const velocity = ghost.body.velocity;
        const angle = Math.atan2(velocity.y, velocity.x);
        
        if (Math.abs(velocity.x) < 10 && Math.abs(velocity.y) < 10) {
            ghost.play('ghost-idle', true);
            return;
        }

        if (angle > -0.785 && angle <= 0.785) ghost.play('ghost-right', true);
        else if (angle > 0.785 && angle <= 2.356) ghost.play('ghost-down', true);
        else if (angle > 2.356 || angle <= -2.356) ghost.play('ghost-left', true);
        else ghost.play('ghost-up', true);
    }
} 