"use server";

import { db } from "..";
import { gameweeks, tournaments } from "../schema";
import { eq, asc, and } from "drizzle-orm";
import { AuthenticationService } from "~/server/utils";

class GameweekService extends AuthenticationService {
  constructor() {
    super();
  }

  async getGameweek(id: number) {
    return await db.query.gameweeks.findFirst({
      where: (model, { eq }) =>
        eq(model.id, id) && eq(model.user_id, this.user.userId),
    });
  }

  async getGameweeks() {
    return await db.query.gameweeks.findMany({
      where: eq(gameweeks.user_id, this.user.userId),
      with: {
        games: {
          with: {
            home_team: true,
            away_team: true,
          },
        },
      },
      orderBy: asc(gameweeks.number),
    });
  }

  async createGameweek(number: number) {
    const tournament = await db.query.tournaments.findFirst({
      where: eq(tournaments.user_id, this.user.userId),
    });

    if (!tournament) throw new Error("No tournament found for this user.");

    const [newGameweek] = await db
      .insert(gameweeks)
      .values({
        number,
        user_id: this.user.userId,
        tournament_id: tournament.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newGameweek;
  }

  async updateGameweek(gameweek: { id: number; number: number }) {
    const [updatedPlayer] = await db
      .update(gameweeks)
      .set({ number: gameweek.number, updatedAt: new Date() })
      .where(
        eq(gameweeks.id, gameweek.id) &&
          eq(gameweeks.user_id, this.user.userId),
      )
      .returning();

    return updatedPlayer;
  }

  async deleteGameweek(id: number) {
    const [deletedGameweek] = await db
      .delete(gameweeks)
      .where(and(eq(gameweeks.id, id), eq(gameweeks.user_id, this.user.userId)))
      .returning();

    return deletedGameweek;
  }
}

const gameweekService = new GameweekService();

export const getGameweek = async (id: number) =>
  gameweekService.getGameweek(id);
export const getGameweeks = async () => gameweekService.getGameweeks();
export const createGameweek = async (number: number) =>
  gameweekService.createGameweek(number);
export const updateGameweek = async (gameweek: {
  id: number;
  number: number;
}) => gameweekService.updateGameweek(gameweek);
export const deleteGameweek = async (id: number) =>
  gameweekService.deleteGameweek(id);
