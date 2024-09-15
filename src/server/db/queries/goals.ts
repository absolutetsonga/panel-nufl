"use server";

import { db } from "..";
import { assists, games, goals, players } from "../schema";
import { and, eq } from "drizzle-orm";
import { AuthenticationService } from "~/server/utils";

import type { ICreateGoal } from "~/components/shared/lib/models/goal";
import type { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/game";
import {
  findAssistedPlayer,
  findGoalScorePlayer,
  findOwnGoalScorePlayer,
  findTeamId,
  updateGameScore,
} from "~/components/widgets/forms/goals/utils";

type createGoalParams = {
  goal: ICreateGoal;
  game: IGameInGameweeksWithTeamPlayersAndGoals;
  teamType: "home" | "away";
};

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

  async createGoal({ goal, game, teamType }: createGoalParams) {
    const result = await db.transaction(async (trx) => {
      const teamId = findTeamId(goal.is_own_goal, teamType, game);

      const [newGoal] = await trx
        .insert(goals)
        .values({
          ...goal,
          team_id: teamId,
          game_id: game.id,
          user_id: this.user.userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      const updatedGameScore = updateGameScore(goal, game, teamType);
      const updatedGame = await trx
        .update(games)
        .set({
          home_team_score: updatedGameScore.home_team_score,
          away_team_score: updatedGameScore.away_team_score,
        })
        .where(eq(games.id, game.id))
        .returning();

      let updatedPlayer = null;
      let updatedAssistPlayer = null;

      if (goal.player_id) {
        if (goal.is_own_goal) {
          const player = findOwnGoalScorePlayer(goal, game);
          if (player) {
            updatedPlayer = await trx
              .update(players)
              .set({
                own_goals: player?.own_goals + 1,
              })
              .where(
                and(
                  eq(players.id, goal.player_id),
                  eq(players.user_id, this.user.userId),
                ),
              )
              .returning();
          }
        } else {
          const player = findGoalScorePlayer(goal, game);
          if (player) {
            updatedPlayer = await trx
              .update(players)
              .set({
                goals: player.goals + 1,
              })
              .where(
                and(
                  eq(players.id, goal.player_id),
                  eq(players.user_id, this.user.userId),
                ),
              )
              .returning();
          }
        }

        if (goal.assist_player_id && newGoal) {
          const player = findAssistedPlayer(goal, game);

          if (player) {
            updatedAssistPlayer = await trx
              .update(players)
              .set({
                assists: player.assists + 1,
              })
              .where(
                and(
                  eq(players.id, goal.assist_player_id),
                  eq(players.user_id, this.user.userId),
                ),
              )
              .returning();

            updatedAssistPlayer = await trx
              .insert(assists)
              .values({
                user_id: this.user.userId,
                game_id: game.id,
                player_id: goal.assist_player_id,
                goal_id: newGoal.id,
                team_id: teamId,
                createdAt: new Date(),
                updatedAt: new Date(),
              })
              .returning();
          }
        }
      }

      return {
        newGoal,
        updatedGame: updatedGame[0],
        updatedPlayer: updatedPlayer ? updatedPlayer[0] : null,
        updatedAssistPlayer: updatedAssistPlayer
          ? updatedAssistPlayer[0]
          : null,
      };
    });
    return result;
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
export const createGoal = async ({ goal, game, teamType }: createGoalParams) =>
  goalService.createGoal({ goal, game, teamType });
export const deleteGoal = async (id: number) => goalService.deleteGoal(id);
