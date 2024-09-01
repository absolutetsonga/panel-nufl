"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { tournaments } from "../schema";
import { eq } from "drizzle-orm";

interface ICreateTournament {
  name: string;
  user_id: string;
}

interface IUpdateTournament {
  id: number;
  name: string;
  user_id: string;
}

// get by user
export const getTournaments = async () => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.tournaments.findMany({
    where: eq(tournaments.user_id, user.userId),
  });
};

// create
export const createTournament = async (tournament: ICreateTournament) => {
  const user = auth();
  if (!user.userId) return Error("Unauthorized");

  const [newTournament] = await db
    .insert(tournaments)
    .values({
      ...tournament,
      user_id: user.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return newTournament;
};

// update
export const updateTournament = async (tournament: IUpdateTournament) => {
  const user = auth();
  if (!user.userId) return Error("Unauthorized");

  const user_tournament = await db.query.tournaments.findFirst({
    where: (model, { eq }) => eq(model.id, tournament.id),
  });

  if (user_tournament?.user_id !== user.userId) throw new Error("Unauthorized");

  const [updatedTournament] = await db
    .update(tournaments)
    .set({
      ...tournament,
      updatedAt: new Date(),
    })
    .where(eq(tournaments.id, tournament.id))
    .returning();

  return updatedTournament;
};

// delete
export const deleteTournament = async (id: number) => {
  const user = auth();
  if (!user.userId) return Error("Unauthorized");

  const tournament = await db.query.tournaments.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (tournament?.user_id !== user.userId) throw new Error("Unauthorized");

  const [deletedTournament] = await db
    .delete(tournaments)
    .where(eq(tournaments.id, id))
    .returning();

  return deletedTournament;
};
