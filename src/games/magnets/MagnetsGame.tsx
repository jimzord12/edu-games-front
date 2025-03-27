import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import Matter from 'matter-js';
import { Engine, World, Bodies, Body, Mouse, MouseConstraint } from 'matter-js';
import { createMagnet } from './components/Magnet';
import { createIronBall } from './components/IronBall';
import { createMaze } from './components/Maze';
import { applyMagneticForces } from './physics/magneticForces';
import { checkWinCondition } from './gameLogic/winCondition';
import { renderUI } from './ui/gameUI';

type Props = {
  canvasW: number;
  canvasH: number;
};

const MagnetsGame = ({ canvasW, canvasH }: Props) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState({
    isPlaying: false,
    score: 0,
    timeElapsed: 0,
    gameWon: false,
  });

  useEffect(() => {
    if (canvasRef.current === null) return;

    const sketch = (p: p5) => {
      // Game objects
      let magnets = [];
      let ironBall;
      let maze;
      let exit;

      // Physics
      let engine;
      let world;
      let mouse;
      let mouseConstraint;

      // Game state
      let startTime = 0;
      let isPlaying = false;
      let gameWon = false;

      p.setup = () => {
        p.createCanvas(canvasW, canvasH);

        // Initialize physics engine
        engine = Engine.create({
          gravity: { x: 0, y: 0 }, // No gravity initially
        });
        world = engine.world;

        // Setup mouse interaction
        mouse = Mouse.create(p.drawingContext.canvas);
        mouse.pixelRatio = p.pixelDensity();
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: { visible: false },
          },
        });

        // Create game objects
        magnets = [
          createMagnet(p, world, 100, 100, 'north'),
          createMagnet(p, world, canvasW - 100, 100, 'south'),
          createMagnet(p, world, 100, canvasH - 100, 'west'),
          createMagnet(p, world, canvasW - 100, canvasH - 100, 'east'),
        ];

        ironBall = createIronBall(p, world, canvasW / 2, canvasH / 2, 15);
        maze = createMaze(p, world, canvasW, canvasH);
        exit = Bodies.rectangle(canvasW - 50, canvasH - 50, 30, 30, {
          isStatic: true,
          isSensor: true,
          render: { fillStyle: 'green' },
        });

        World.add(world, [exit, mouseConstraint]);

        // Start the game
        startTime = p.millis();
        isPlaying = true;
        setGameState((prev) => ({ ...prev, isPlaying: true }));
      };

      p.draw = () => {
        // Update physics
        Engine.update(engine);

        // Apply magnetic forces
        if (isPlaying && !gameWon) {
          applyMagneticForces(ironBall, magnets, world);

          // Check win condition
          if (checkWinCondition(ironBall, exit)) {
            gameWon = true;
            const finalTime = (p.millis() - startTime) / 1000;
            setGameState((prev) => ({
              ...prev,
              gameWon: true,
              timeElapsed: finalTime,
              score: Math.max(1000 - Math.floor(finalTime) * 10, 100),
            }));
          }
        }

        // Render game
        p.background(240);

        // Set rectMode to CENTER to match Matter.js coordinates
        p.rectMode(p.CENTER);

        // Draw maze
        p.push();
        p.fill(100);
        p.noStroke();
        maze.forEach((wall) => {
          p.rect(
            wall.position.x,
            wall.position.y,
            wall.bounds.max.x - wall.bounds.min.x,
            wall.bounds.max.y - wall.bounds.min.y
          );
        });
        p.pop();

        // Draw exit
        p.push();
        p.fill(0, 255, 0);
        p.rect(
          exit.position.x,
          exit.position.y,
          exit.bounds.max.x - exit.bounds.min.x,
          exit.bounds.max.y - exit.bounds.min.y
        );
        p.pop();

        // Draw iron ball
        p.push();
        p.fill(150);
        p.ellipse(
          ironBall.position.x,
          ironBall.position.y,
          ironBall.circleRadius * 2
        );
        p.pop();

        // Draw magnets
        magnets.forEach((magnet) => {
          p.push();
          p.fill(
            magnet.polarity === 'north'
              ? p.color(255, 0, 0)
              : p.color(0, 0, 255)
          );
          p.rect(
            magnet.position.x,
            magnet.position.y,
            magnet.bounds.max.x - magnet.bounds.min.x,
            magnet.bounds.max.y - magnet.bounds.min.y
          );

          // Draw magnetic field visualization
          p.stroke(
            magnet.polarity === 'north'
              ? p.color(255, 0, 0, 50)
              : p.color(0, 0, 255, 50)
          );
          p.noFill();
          for (let i = 1; i <= 3; i++) {
            p.ellipse(
              magnet.position.x,
              magnet.position.y,
              magnet.bounds.max.x - magnet.bounds.min.x + i * 30
            );
          }
          p.pop();
        });

        // Render UI
        renderUI(p, gameState);
      };
    };

    const p5Instance = new p5(sketch, canvasRef.current);
    return () => p5Instance.remove();
  }, [canvasW, canvasH]);

  return <div ref={canvasRef} />;
};

export default MagnetsGame;
