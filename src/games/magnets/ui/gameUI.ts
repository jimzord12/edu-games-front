import p5 from 'p5';

interface GameState {
  isPlaying: boolean;
  score: number;
  timeElapsed: number;
  gameWon: boolean;
}

// This Renders p5 UI elements
export const renderUI = (p: p5, gameState: GameState): void => {
  p.push();
  p.fill(0);
  p.textSize(16);

  // Display time
  const timeText = gameState.gameWon
    ? `Time: ${gameState.timeElapsed.toFixed(1)}s`
    : `Time: ${((p.millis() - p.millis()) / 1000).toFixed(1)}s`;
  p.text(timeText, 20, 30);

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

  // Display instructions
  if (!gameState.isPlaying) {
    p.textSize(24);
    p.text(
      'Click and drag magnets to move the iron ball through the maze',
      p.width / 2 - 250,
      p.height / 2
    );
    p.textSize(18);
    p.text('Press SPACE to start', p.width / 2 - 80, p.height / 2 + 40);
  }

  p.pop();
};
