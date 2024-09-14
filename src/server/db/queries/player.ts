"use server";
import { db } from "..";
import { players } from "../schema";
import { and, eq } from "drizzle-orm";

import type {
  ICreatePlayer,
  IUpdatePlayer,
  IUpdatePlayerAssistScore,
  IUpdatePlayerGoalScore,
} from "~/components/shared/lib/models/player";
import { AuthenticationService } from "~/server/utils";

class PlayerService extends AuthenticationService {
  constructor() {
    super();
  }

  async getPlayer(id: number) {
    return await db.query.players.findFirst({
      where: (model, { eq }) =>
        and(eq(model.id, id), eq(model.user_id, this.user.userId)),
    });
  }

  async getPlayers(team_id: number) {
    return await db.query.players.findMany({
      where: and(
        eq(players.team_id, team_id),
        eq(players.user_id, this.user.userId),
      ),
    });
  }

  async createPlayer(player: ICreatePlayer) {
    const player_age = player.age ? player.age : new Date();

    const [newPlayer] = await db
      .insert(players)
      .values({
        ...player,
        age: player_age,
        user_id: this.user.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newPlayer;
  }

  async updatePlayer(player: IUpdatePlayer) {
    const { id, ...playerWithoutId } = player;
    const [updatedPlayer] = await db
      .update(players)
      .set({ ...playerWithoutId, updatedAt: new Date() })
      .where(and(eq(players.id, id), eq(players.user_id, this.user.userId)))
      .returning();

    return updatedPlayer;
  }

  async updatePlayerGoalScore(player: IUpdatePlayerGoalScore) {
    const [updatedPlayer] = await db
      .update(players)
      .set({ goals: player.goals })
      .where(
        and(eq(players.id, player.id), eq(players.user_id, this.user.userId)),
      )
      .returning();

    return updatedPlayer;
  }

  async updatePlayerAssistScore(player: IUpdatePlayerAssistScore) {
    const [updatedPlayer] = await db
      .update(players)
      .set({ assists: player.assists })
      .where(
        and(eq(players.id, player.id), eq(players.user_id, this.user.userId)),
      )
      .returning();

    return updatedPlayer;
  }

  async deletePlayer(id: number) {
    const [deletedPlayer] = await db
      .delete(players)
      .where(and(eq(players.id, id), eq(players.user_id, this.user.userId)))
      .returning();

    return deletedPlayer;
  }
}

const playerService = new PlayerService();

export const getPlayer = async (id: number) => playerService.getPlayer(id);
export const getPlayers = async (team_id: number) =>
  playerService.getPlayers(team_id);

export const createPlayer = async (player: ICreatePlayer) =>
  playerService.createPlayer(player);

export const updatePlayer = async (player: IUpdatePlayer) =>
  playerService.updatePlayer(player);

export const updatePlayerGoalScore = async (player: IUpdatePlayerGoalScore) =>
  playerService.updatePlayerGoalScore(player);

export const updatePlayerAssistScore = async (
  player: IUpdatePlayerAssistScore,
) => playerService.updatePlayerAssistScore(player);

export const deletePlayer = async (id: number) =>
  playerService.deletePlayer(id);
