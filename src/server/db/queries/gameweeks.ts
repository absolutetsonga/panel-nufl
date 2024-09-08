"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { gameweeks, tournaments } from "../schema";
import { eq, desc } from "drizzle-orm";

// read
export const getGameweek = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const gameweek = await db.query.gameweeks.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!gameweek) throw new Error("Gameweek not found");
  if (gameweek.user_id !== user.userId) throw new Error("Unauthorized");

  return gameweek;
};

// read all gameweeks
export const getGameweeks = async () => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.gameweeks.findMany({
    where: eq(gameweeks.user_id, user.userId),
    orderBy: desc(gameweeks.createdAt),
  });
};

// create gameweek
export const createGameweek = async (number: number) => {
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

  const [newGameweek] = await db
    .insert(gameweeks)
    .values({
      number,
      user_id: user.userId,
      tournament_id: tournament.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return newGameweek;
};

// delete gameweek
export const deleteGameweek = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const gameweek = await db.query.gameweeks.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (gameweek?.user_id !== user.userId) throw new Error("Unauthorized");

  const [deletedGameweek] = await db
    .delete(gameweeks)
    .where(eq(gameweeks.id, id))
    .returning();

  return deletedGameweek;
};