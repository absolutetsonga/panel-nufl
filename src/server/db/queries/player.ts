"use server";
import { db } from "..";
import { players } from "../schema";
import { and, desc, eq } from "drizzle-orm";

import { AuthenticationService } from "~/server/utils";

import type {
  ICreatePlayer,
  IUpdatePlayer,
} from "~/components/shared/lib/models/player";

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

  async getTopGoalscorers() {
    return await db.query.players.findMany({
      where: (model, { eq }) => eq(model.user_id, this.user.userId),
      with: { team: true },
      orderBy: desc(players.goals),
      limit: 10,
    });
  }

  async getTopAssists() {
    return await db.query.players.findMany({
      where: (model, { eq }) => eq(model.user_id, this.user.userId),
      with: { team: true },
      orderBy: desc(players.assists),
      limit: 10,
    });
  }

  async getTopCleanSheets() {
    return await db.query.players.findMany({
      where: (model, { eq }) => eq(model.user_id, this.user.userId),
      with: { team: true },
      orderBy: desc(players.clean_sheets),
      limit: 10,
    });
  }

  async getTopYellowCards() {
    return await db.query.players.findMany({
      where: (model, { eq }) => eq(model.user_id, this.user.userId),
      with: { team: true },
      orderBy: desc(players.yellow_cards),
      limit: 10,
    });
  }

  async getTopRedCards() {
    return await db.query.players.findMany({
      where: (model, { eq }) => eq(model.user_id, this.user.userId),
      with: { team: true },
      orderBy: desc(players.red_cards),
      limit: 10,
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

export const getTopGoalscorers = async () => playerService.getTopGoalscorers();
export const getTopAssists = async () => playerService.getTopAssists();
export const getTopYellowCards = async () => playerService.getTopYellowCards();
export const getTopRedCards = async () => playerService.getTopRedCards();
export const getTopCleanSheets = async () => playerService.getTopCleanSheets();

export const createPlayer = async (player: ICreatePlayer) =>
  playerService.createPlayer(player);

export const updatePlayer = async (player: IUpdatePlayer) =>
  playerService.updatePlayer(player);

export const deletePlayer = async (id: number) =>
  playerService.deletePlayer(id);
