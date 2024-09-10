"use server";

import { db } from "..";
import { tournaments } from "../schema";
import { eq } from "drizzle-orm";
import { AuthenticationService } from "~/server/utils";
import type {
  ICreateTournament,
  IUpdateTournament,
} from "~/components/shared/lib/models/team";

class TournamentService extends AuthenticationService {
  constructor() {
    super();
  }

  async getTournament() {
    const tournament = await db.query.tournaments.findFirst({
      where: eq(tournaments.user_id, this.user.userId),
    });

    return tournament ?? null;
  }

  async createTournament(tournament: ICreateTournament) {
    const [newTournament] = await db
      .insert(tournaments)
      .values({
        ...tournament,
        user_id: this.user.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newTournament;
  }

  async updateTournament(tournament: IUpdateTournament) {
    const [updatedTournament] = await db
      .update(tournaments)
      .set({
        ...tournament,
        updatedAt: new Date(),
      })
      .where(
        eq(tournaments.id, tournament.id) &&
          eq(tournaments.user_id, this.user.userId),
      )
      .returning();

    return updatedTournament;
  }

  async deleteTournament(id: number) {
    const [deletedTournament] = await db
      .delete(tournaments)
      .where(
        eq(tournaments.id, id) && eq(tournaments.user_id, this.user.userId),
      )
      .returning();

    return deletedTournament;
  }
}

const tournamentService = new TournamentService();

export const getTournament = async () => tournamentService.getTournament();
export const createTournament = async (team: ICreateTournament) =>
  tournamentService.createTournament(team);
export const updateTournament = async (team: IUpdateTournament) =>
  tournamentService.updateTournament(team);
export const deleteTournament = async (id: number) =>
  tournamentService.deleteTournament(id);
