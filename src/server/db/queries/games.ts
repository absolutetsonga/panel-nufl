"use server";
import { db } from "..";
import { games } from "../schema";
import { eq, desc } from "drizzle-orm";

import { AuthenticationService } from "~/server/utils";
import type {
  ICreateGame,
  IUpdateGame,
} from "~/components/shared/lib/models/games";

class GameService extends AuthenticationService {
  constructor() {
    super();
  }

  async getGame(id: number) {
    return await db.query.games.findFirst({
      where: (model, { eq }) => eq(model.id, id),
      with: {
        home_team: true,
        away_team: true,
      },
    });
  }

  async getGames() {
    return await db.query.games.findMany({
      where: eq(games.user_id, this.user.userId),
      with: {
        home_team: true,
        away_team: true,
      },
      orderBy: desc(games.date),
    });
  }

  async createGame(game: ICreateGame) {
    const [newGame] = await db
      .insert(games)
      .values({
        ...game,
        gameweek_id: game.gameweek_id,
        user_id: this.user.userId,
        result: "Not Started",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newGame;
  }

  async updateGame(game: IUpdateGame) {
    const [updatedGame] = await db
      .update(games)
      .set({
        ...game,
        user_id: this.user.userId,
        result: "Not Started",
        updatedAt: new Date(),
      })
      .where(eq(games.id, game.game_id))
      .returning();

    return updatedGame;
  }

  async deleteGame(id: number) {
    const game = await db.query.games.findFirst({
      where: (model, { eq }) => eq(model.id, id),
    });

    if (game?.user_id !== this.user.userId) throw new Error("Unauthorized");

    const [deletedGame] = await db
      .delete(games)
      .where(eq(games.id, id))
      .returning();

    return deletedGame;
  }
}

const gameService = new GameService();

export const getGame = async (id: number) => gameService.getGame(id);
export const getGames = async () => gameService.getGames();
export const createGame = async (game: ICreateGame) =>
  gameService.createGame(game);
export const updateGame = async (game: IUpdateGame) =>
  gameService.updateGame(game);
export const deleteGame = async (id: number) => gameService.deleteGame(id);
