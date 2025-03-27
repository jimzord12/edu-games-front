import p5 from "p5";
import { Bodies, Body, World } from "matter-js";

export const createMaze = (
  p: p5, 
  world: Matter.World, 
  canvasWidth: number, 
  canvasHeight: number
): Body[] => {
  // Create a simple maze with walls
  const wallThickness = 10;
  const walls = [
    // Outer walls
    Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, wallThickness, { isStatic: true }),
    Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, wallThickness, { isStatic: true }),
    Bodies.rectangle(0, canvasHeight / 2, wallThickness, canvasHeight, { isStatic: true }),
    Bodies.rectangle(canvasWidth, canvasHeight / 2, wallThickness, canvasHeight, { isStatic: true }),
    
    // Inner maze walls - customize these for your maze design
    Bodies.rectangle(canvasWidth / 3, canvasHeight / 3, canvasWidth / 3, wallThickness, { isStatic: true }),
    Bodies.rectangle(canvasWidth * 2/3, canvasHeight * 2/3, canvasWidth / 3, wallThickness, { isStatic: true }),
    Bodies.rectangle(canvasWidth / 3, canvasHeight * 2/3, wallThickness, canvasHeight / 3, { isStatic: true }),
    Bodies.rectangle(canvasWidth * 2/3, canvasHeight / 3, wallThickness, canvasHeight / 3, { isStatic: true })
  ];
  
  World.add(world, walls);
  
  return walls;
};