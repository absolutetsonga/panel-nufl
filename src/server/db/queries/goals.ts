"use server";

import { db } from "..";
import { assists, goals } from "../schema";
import { and, eq } from "drizzle-orm";
import { AuthenticationService } from "~/server/utils";

import type { ICreateGoal } from "~/components/shared/lib/models/goal";

class GoalService extends AuthenticationService {
  constructor() {
    super();
  }

  async getGoals(gameId: number) {
    return await db.query.goals.findMany({
      where: (model, { eq }) =>
        and(eq(model.game_id, gameId), eq(goals.user_id, this.user.userId)),
      with: { player: true },
    });
  }

  async createGoal(goal: ICreateGoal) {
    const [newGoal] = await db
      .insert(goals)
      .values({
        ...goal,
        user_id: this.user.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (goal.assist_player_id && newGoal) {
      await db.insert(assists).values({
        user_id: this.user.userId,
        game_id: goal.game_id,
        player_id: goal.assist_player_id,
        goal_id: newGoal.id,
        team_id: goal.team_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return newGoal;
  }

  async deleteGoal(id: number) {
    const [deletedTeam] = await db
      .delete(goals)
      .where(and(eq(goals.id, id), eq(goals.user_id, this.user.userId)))
      .returning();

    return deletedTeam;
  }
}

const goalService = new GoalService();

export const getGoals = async (gameId: number) => goalService.getGoals(gameId);
export const createGoal = async (goal: ICreateGoal) =>
  goalService.createGoal(goal);
export const deleteGoal = async (id: number) => goalService.deleteGoal(id);
