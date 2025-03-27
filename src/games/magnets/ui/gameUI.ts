import p5 from 'p5';
import type { GameState } from '../../../store/gameSlice';

export const renderUI = (p: p5, gameState: GameState): void => {
  p.push();
  p.fill(0);
  p.textSize(16);

  // Display time - fixed calculation
  const timeText = gameState.gameWon
    ? `Time: ${gameState.timeElapsed.toFixed(1)}s`
    : gameState.isPlaying
    ? `Time: ${gameState.timeElapsed.toFixed(1)}s`
    : 'Time: 0.0s';
    
  p.text(timeText, 20, 30);
  
  // Display Redux state values for debugging
  p.text(`Redux State:`, 20, 60);
  p.text(`isPlaying: ${gameState.isPlaying}`, 20, 80);
  p.text(`gameWon: ${gameState.gameWon}`, 20, 100);
  p.text(`score: ${gameState.score}`, 20, 120);

  // Display score if game is won
  if (gameState.gameWon) {
    p.textSize(32);
    p.fill(0, 128, 0);
    p.text(
      `You Win! Score: ${gameState.score}`,
      p.width / 2 - 150,
      p.height / 2
    );

    p.textSize(18);
    p.text('Press R to restart', p.width / 2 - 80, p.height / 2 + 40);
  }

  // Display instructions only if not playing
  if (!gameState.isPlaying) {
    p.textSize(20);
    p.text(
      'Drag magnets to move the iron ball to the exit',
      p.width / 2 - 180,
      p.height / 2
    );
    p.textSize(18);
    p.text('Press ENTER to start', p.width / 2 - 80, p.height / 2 + 40);
  }

  p.pop();
};
