import { useLiveQuery } from 'dexie-react-hooks';
import { db, Player, GameSession } from '../dexieDB/db';

// Hook for fetching and modifying data
export function useDexie() {
  /** === PLAYER FUNCTIONS === */

  // Get all players
  const players = useLiveQuery(() => db.players.toArray(), []);

  // Get a player by ID or name
  const getPlayer = async (playerIdentifier: number | string) => {
    if (typeof playerIdentifier === 'number') {
      return await db.players.get(playerIdentifier);
    } else {
      return await db.players
        .where('name')
        .equalsIgnoreCase(playerIdentifier)
        .first();
    }
  };

  // Increment the gamesPlayed count for a player
  const incrementGamesPlayed = async (
    playerIdentifier: number | string,
    amount = 1
  ) => {
    const player = await getPlayer(playerIdentifier);
    if (player) {
      await db.players.update(player.id!, {
        gamesPlayed: player.gamesPlayed + amount,
      });
    }
  };

  // Update the lastGameDate for a player
  const updateLastGameDate = async (playerIdentifier: number | string) => {
    const player = await getPlayer(playerIdentifier);
    if (player) {
      await db.players.update(player.id!, { lastGameDate: new Date() });
    }
  };

  // Delete a player by ID or name
  const deletePlayer = async (playerIdentifier: number | string) => {
    const player = await getPlayer(playerIdentifier);
    if (player) {
      await db.players.delete(player.id!);
    }
  };

  /** === GAMES FUNCTIONS === */

  // Get all games
  const games = useLiveQuery(() => db.games.toArray(), []);

  const getGame = async (gameIdentifier: number | string) => {
    if (typeof gameIdentifier === 'number') {
      return await db.games.get(gameIdentifier);
    } else {
      return await db.games
        .where('name')
        .equalsIgnoreCase(gameIdentifier)
        .first();
    }
  };

  /** === GAME SESSIONS FUNCTIONS === */

  // Get all game sessions
  const gameSessions = useLiveQuery(() => db.gameSessions.toArray(), []);

  // Get game sessions by gameId
  const getByGameId = async (gameId: number) => {
    return await db.gameSessions.where('gameId').equals(gameId).toArray();
  };

  /** === HELPER FUNCTION === */

  // Get player's average score for a specific game
  const getPlayerAvgScore = async (
    playerIdentifier: number | string,
    gameIdentifier: number | string
  ) => {
    const player = await getPlayer(playerIdentifier);
    if (!player) return null;

    const game = await getGame(gameIdentifier);
    if (!game) return null;

    const sessions = await db.gameSessions
      .where({ playerId: player.id, gameId: game.id })
      .toArray();
    if (sessions.length === 0) return null;

    const totalScore = sessions.reduce(
      (sum, session) => sum + session.score,
      0
    );
    return totalScore / sessions.length;
  };

  return {
    players,
    games,
    gameSessions,
    getPlayer,
    incrementGamesPlayed,
    updateLastGameDate,
    deletePlayer,
    getByGameId,
    getPlayerAvgScore,
  };
}
