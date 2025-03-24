import Dexie, { Table } from 'dexie';

// Define database schema
export class MyDatabase extends Dexie {
  players!: Table<Player>;
  games!: Table<Game>;
  gameSessions!: Table<GameSession>;

  constructor() {
    super('MyGameDB');

    this.version(1).stores({
      players: '++id, name, age, gamesPlayed, createdAt, lastGameDate',
      games: '++id, name, category, subCategory, avgScore',
      gameSessions: '++id, gameId, playerId, startedAt, endedAt, score',
    });
  }
}

// Create a single instance
export const db = new MyDatabase();

// Define TypeScript interfaces
export interface Player {
  id?: number;
  name: string;
  age: number;
  gamesPlayed: number;
  createdAt: Date;
  lastGameDate: Date;
}

export interface Game {
  id?: number;
  name: string;
  category: string;
  subCategory: string;
}

export interface GameSession {
  id?: number;
  gameId: number;
  playerId: number;
  startedAt: Date;
  endedAt: Date;
  score: number;
}
