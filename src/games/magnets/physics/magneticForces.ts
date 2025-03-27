import { Body, Vector, World } from 'matter-js';
import { Magnet } from '../components/Magnet';
import { IronBall } from '../components/IronBall';

export const applyMagneticForces = (
  ironBall: IronBall,
  magnets: Magnet[],
  world: World
): void => {
  magnets.forEach((magnet) => {
    // Calculate distance between magnet and iron ball
    const distance = Vector.magnitude(
      Vector.sub(magnet.position, ironBall.position)
    );

    // Skip if too far away (optimization)
    if (distance > 200) return;

    // Calculate force direction
    const direction = Vector.normalise(
      Vector.sub(magnet.position, ironBall.position)
    );

    // Force magnitude decreases with square of distance (inverse square law)
    const forceMagnitude = (magnet.strength * 0.01) / (distance * distance);

    // Apply force based on polarity
    let force;

    switch (magnet.polarity) {
      case 'north':
        // North pole pushes
        force = Vector.mult(direction, -forceMagnitude * 1000);
        break;
      case 'south':
        // South pole attracts
        force = Vector.mult(direction, forceMagnitude * 1000);
        break;
      case 'east':
        // East pushes horizontally
        force = Vector.create(forceMagnitude * 1000, 0);
        break;
      case 'west':
        // West pushes horizontally
        force = Vector.create(-forceMagnitude * 1000, 0);
        break;
    }

    Body.applyForce(ironBall, ironBall.position, force);
  });
};
