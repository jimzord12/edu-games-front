import p5 from "p5";
import { Bodies, Body, World } from "matter-js";

export interface IronBall extends Body {
  isMagnetic: boolean;
  circleRadius: number;
}

export const createIronBall = (
  p: p5, 
  world: Matter.World, 
  x: number, 
  y: number, 
  radius: number
): IronBall => {
  const body = Bodies.circle(x, y, radius, {
    restitution: 0.6,
    friction: 0.1,
    frictionAir: 0.01,
    render: { fillStyle: '#777777' }
  }) as IronBall;
  
  body.isMagnetic = true;
  body.circleRadius = radius;
  
  World.add(world, body);
  
  return body;
};