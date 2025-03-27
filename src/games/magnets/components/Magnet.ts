import p5 from "p5";
import { Bodies, Body, World } from "matter-js";

export type MagnetPolarity = "north" | "south" | "east" | "west";

export interface Magnet extends Body {
  polarity: MagnetPolarity;
  strength: number;
}

export const createMagnet = (
  p: p5, 
  world: Matter.World, 
  x: number, 
  y: number, 
  polarity: MagnetPolarity
): Magnet => {
  const size = 40;
  const body = Bodies.rectangle(x, y, size, size, {
    isStatic: false,
    restitution: 0.6,
    friction: 0.1,
    frictionAir: 0.05, // Increased air friction for better control
    density: 0.01,     // Lower density to make magnets easier to move
    render: { 
      fillStyle: polarity === "north" || polarity === "east" ? '#ff0000' : '#0000ff' 
    }
  }) as Magnet;
  
  body.polarity = polarity;
  body.strength = 0.2; // Increased magnetic strength for better gameplay
  
  World.add(world, body);
  
  return body;
};