"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { players, teams, tournaments } from "../schema";
import { eq } from "drizzle-orm";

// read
export const getTeam = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const team = await db.query.teams.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!team) throw new Error("Team not found");

  const team_players = await db.query.players.findMany({
    where: eq(players.team_id, team.id),
  });

  if (team.user_id !== user.userId) throw new Error("Unauthorized");

  return { ...team, team_players };
};

// read teams
export const getTeams = async () => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.teams.findMany({
    where: eq(teams.user_id, user.userId),
  });
};

// create
export const createTeam = async (name: string, image: string) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const tournament = await db.query.tournaments.findFirst({
    where: eq(tournaments.user_id, user.userId),
  });

  if (!tournament) {
    throw new Error(
      "No tournament found for this user. Please make sure you created tournament.",
    );
  }

  const [newTeam] = await db
    .insert(teams)
    .values({
      name,
      image,
      user_id: user.userId,
      tournament_id: tournament.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return newTeam;
};

// updateTeam
export const updateTeam = async (id: number, name: string, image: string) => {
  const user = auth();
  if (!user.userId) return Error("Unauthorized");

  const [updatedTeam] = await db
    .update(teams)
    .set({
      name,
      image,
      updatedAt: new Date(),
    })
    .where(eq(teams.id, id))
    .returning();

  return updatedTeam;
};

// deleteTeam
export const deleteTeam = async (id: number) => {
  const user = auth();
  if (!user.userId) return Error("Unauthorized");

  const [deletedTeam] = await db
    .delete(teams)
    .where(eq(teams.id, id))
    .returning();

  return deletedTeam;
};
