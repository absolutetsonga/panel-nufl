"use server";
import { db } from "..";
import { assists, games, goals } from "../schema";
import { and, eq } from "drizzle-orm";
import { AuthenticationService } from "~/server/utils";

import type { ICreateAssist } from "~/components/shared/lib/models/assist";

class AssistService extends AuthenticationService {
  constructor() {
    super();
  }

  async getAssists(gameId: number) {
    return await db.query.assists.findMany({
      where: and(eq(goals.user_id, this.user.userId), eq(games.id, gameId)),
    });
  }

  async createAssist(assist: ICreateAssist) {
    const [newAssist] = await db
      .insert(assists)
      .values({
        ...assist,
        user_id: this.user.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newAssist;
  }
}

const assistService = new AssistService();

export const getAssists = async (gameId: number) =>
  assistService.getAssists(gameId);
export const createAssist = async (team: ICreateAssist) =>
  assistService.createAssist(team);
