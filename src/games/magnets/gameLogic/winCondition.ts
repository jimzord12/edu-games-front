import { Body } from "matter-js";

export const checkWinCondition = (
  ironBall: Body, 
  exit: Body
): boolean => {
  // Improved collision detection with a small tolerance
  const ballBounds = ironBall.bounds;
  const exitBounds = exit.bounds;
  
  // Calculate centers
  const ballCenter = {
    x: (ballBounds.max.x + ballBounds.min.x) / 2,
    y: (ballBounds.max.y + ballBounds.min.y) / 2
  };
  
  const exitCenter = {
    x: (exitBounds.max.x + exitBounds.min.x) / 2,
    y: (exitBounds.max.y + exitBounds.min.y) / 2
  };
  
  // Calculate distance between centers
  const dx = ballCenter.x - exitCenter.x;
  const dy = ballCenter.y - exitCenter.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Ball is considered at exit if centers are close enough
return distance < ironBall.circleRadius * 1.5;
};