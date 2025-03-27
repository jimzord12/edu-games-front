import { useEffect, useRef, useCallback } from 'react';
import p5 from 'p5';
import { Engine, World, Bodies, Body, Mouse, MouseConstraint } from 'matter-js';
import { createMagnet } from './components/Magnet';
import { createIronBall } from './components/IronBall';
import { createMaze } from './components/Maze';
import { applyMagneticForces } from './physics/magneticForces';
import { checkWinCondition } from './gameLogic/winCondition';
import { renderUI } from './ui/gameUI';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startGame, endGame } from '../../store/gameSlice';

type Props = {
  canvasW: number;
  canvasH: number;
};

const MagnetsGame = ({ canvasW, canvasH }: Props) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const gameInstanceRef = useRef<{
    isPlaying: boolean;
    gameWon: boolean;
    ironBall: any;
    startTime: number;
    engine: any;
  }>({
    isPlaying: false,
    gameWon: false,
    ironBall: null,
    startTime: 0,
    engine: null,
  });
  
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);

  // Handle key presses at React level
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const gameInstance = gameInstanceRef.current;
    
    // Start game when Enter is pressed
    if (e.key === 'Enter' && !gameInstance.isPlaying) {
      console.log('Start game via React handler');
      gameInstance.isPlaying = true;
      gameInstance.startTime = Date.now();
      
      // Update Redux state
      dispatch(startGame());
    }
    
    // Restart game when R is pressed
    if ((e.key === 'r' || e.key === 'R') && gameInstance.gameWon) {
      gameInstance.isPlaying = true;
      gameInstance.gameWon = false;
      gameInstance.startTime = Date.now();
      
      // Reset ball position if available
      if (gameInstance.ironBall) {
        Body.setPosition(gameInstance.ironBall, { x: canvasW / 2, y: canvasH / 2 });
        Body.setVelocity(gameInstance.ironBall, { x: 0, y: 0 });
      }
      
      dispatch(startGame());
    }
  }, [dispatch, canvasW, canvasH]);

  useEffect(() => {
    // Add event listener for key presses
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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

        // Initialize start time but don't start the game yet
        startTime = p.millis();
        
        // Store references in the ref for access from React
        gameInstanceRef.current = {
          isPlaying: false, // Start paused
          gameWon: false,
          ironBall,
          startTime,
          engine,
        };
      };

      p.draw = () => {
        // Update physics only if game is playing
        if (gameState.isPlaying && !gameState.gameWon) {
          Engine.update(engine);
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

        // Apply magnetic forces if game is playing
        if (gameState.isPlaying && !gameState.gameWon) {
          applyMagneticForces(ironBall, magnets, world);

          // Check win condition
          if (checkWinCondition(ironBall, exit)) {
            const finalTime = (p.millis() - startTime) / 1000;
            dispatch(
              endGame({
                score: Math.max(1000 - Math.floor(finalTime) * 10, 100),
                timeElapsed: finalTime,
              })
            );
          }
        }

        // Create a custom game state for UI rendering that includes the current time
        const uiGameState = {
          ...gameState,
          // Calculate elapsed time based on the stored start time
          timeElapsed: gameState.isPlaying && !gameState.gameWon
            ? (p.millis() - startTime) / 1000 
            : gameState.timeElapsed
        };

        // Render UI with the combined state
        renderUI(p, uiGameState);
      };
    };

    const p5Instance = new p5(sketch, canvasRef.current);
    p5InstanceRef.current = p5Instance;
    
    return () => {
      p5Instance.remove();
      p5InstanceRef.current = null;
    };
  }, [canvasW, canvasH, dispatch, gameState]);

  // Add this inside your component, before the return statement
  // This useEffect will run whenever the Redux state changes
  useEffect(() => {
    // Update the game instance ref with the latest Redux state
    if (gameInstanceRef.current) {
      // Only update if the values are different to avoid unnecessary re-renders
      if (gameInstanceRef.current.isPlaying !== gameState.isPlaying) {
        console.log('Syncing Redux isPlaying state to p5:', gameState.isPlaying);
        gameInstanceRef.current.isPlaying = gameState.isPlaying;
      }
      
      if (gameInstanceRef.current.gameWon !== gameState.gameWon) {
        console.log('Syncing Redux gameWon state to p5:', gameState.gameWon);
        gameInstanceRef.current.gameWon = gameState.gameWon;
      }
    }
  }, [gameState]);

  return (
    <div 
      ref={canvasRef} 
      tabIndex={0}
      style={{ outline: 'none' }}
    />
  );
};

export default MagnetsGame;
