"use server";
import { db } from "..";
import { teams, tournaments } from "../schema";
import { and, eq } from "drizzle-orm";
import { AuthenticationService } from "~/server/utils";
import type {
  ICreateTeam,
  IUpdateTeam,
} from "~/components/shared/lib/models/team";

class TeamService extends AuthenticationService {
  constructor() {
    super();
  }

  async getTeam(id: number) {
    const team = await db.query.teams.findFirst({
      where: (model, { eq }) =>
        and(eq(model.id, id), eq(model.user_id, this.user.userId)),
      with: { players: true },
    });

    if (!team) throw new Error("Team not found");

    return team;
  }

  async getTeams() {
    return await db.query.teams.findMany({
      where: eq(teams.user_id, this.user.userId),
    });
  }

  async createTeam(team: ICreateTeam) {
    const tournament = await db.query.tournaments.findFirst({
      where: eq(tournaments.user_id, this.user.userId),
    });

    if (!tournament) throw new Error("No tournament found for this user.");

    const [newTeam] = await db
      .insert(teams)
      .values({
        name: team.name,
        image: team.image,
        user_id: this.user.userId,
        tournament_id: tournament.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newTeam;
  }

  async updateTeam(team: IUpdateTeam) {
    const [updatedTeam] = await db
      .update(teams)
      .set({
        name: team.name,
        image: team.image,
        updatedAt: new Date(),
      })
      .where(eq(teams.id, team.id) && eq(teams.user_id, this.user.userId))
      .returning();

    return updatedTeam;
  }

  async deleteTeam(id: number) {
    const [deletedTeam] = await db
      .delete(teams)
      .where(eq(teams.id, id) && eq(teams.user_id, this.user.userId))
      .returning();

    return deletedTeam;
  }
}

const teamService = new TeamService();

export const getTeam = async (id: number) => teamService.getTeam(id);
export const getTeams = async () => teamService.getTeams();
export const createTeam = async (team: ICreateTeam) =>
  teamService.createTeam(team);
export const updateTeam = async (team: IUpdateTeam) =>
  teamService.updateTeam(team);
export const deleteTeam = async (id: number) => teamService.deleteTeam(id);
