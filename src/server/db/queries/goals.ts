"use server";

import { db } from "..";
import { goals } from "../schema";
import { and, eq } from "drizzle-orm";
import { AuthenticationService } from "~/server/utils";

import type { ICreateGoal } from "~/components/shared/lib/models/games";

class GoalService extends AuthenticationService {
  constructor() {
    super();
  }

  async getGoals(gameId: number) {
    return await db.query.goals.findMany({
      where: and(
        eq(goals.game_id, gameId),
        eq(goals.user_id, this.user.userId),
      ),
      with: {
        player: true,
      },
    });
  }

  async createGoal(goal: ICreateGoal) {
    const [newPlayer] = await db
      .insert(goals)
      .values({
        ...goal,
        user_id: this.user.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newPlayer;
  }

  async deleteGoal(id: number) {
    const [deletedTeam] = await db
      .delete(goals)
      .where(eq(goals.id, id) && eq(goals.user_id, this.user.userId))
      .returning();

    return deletedTeam;
  }
}

const goalService = new GoalService();

export const getGoals = async (gameId: number) => goalService.getGoals(gameId);
export const createGoal = async (team: ICreateGoal) =>
  goalService.createGoal(team);
export const deleteGoal = async (id: number) => goalService.deleteGoal(id);
