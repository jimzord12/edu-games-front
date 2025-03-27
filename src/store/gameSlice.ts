import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
  isPlaying: boolean;
  score: number;
  timeElapsed: number;
  gameWon: boolean;
  // Add more state properties as needed
}

const initialState: GameState = {
  isPlaying: false,
  score: 0,
  timeElapsed: 0,
  gameWon: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isPlaying = true;
      state.gameWon = false;
      state.score = 0;
      state.timeElapsed = 0;
    },
    endGame: (
      state,
      action: PayloadAction<{ score: number; timeElapsed: number }>
    ) => {
      state.isPlaying = false;
      state.gameWon = true;
      state.score = action.payload.score;
      state.timeElapsed = action.payload.timeElapsed;
    },
    resetGame: (state) => {
      state.isPlaying = false;
      state.gameWon = false;
      state.score = 0;
      state.timeElapsed = 0;
    },
    // Add more actions as needed
  },
});

export const { startGame, endGame, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
