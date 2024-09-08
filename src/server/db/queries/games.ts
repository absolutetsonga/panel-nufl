"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { games } from "../schema";
import { eq, desc } from "drizzle-orm";

import type { ICreateAndUpdateGame } from "~/components/shared/lib/models/games";

// read
export const getGame = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const game = await db.query.games.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!game) throw new Error("Game not found");
  if (game.user_id !== user.userId) throw new Error("Unauthorized");

  return game;
};

// read all games
export const getAllGames = async () => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const gamesWithTeams = await db.query.games.findMany({
    where: eq(games.user_id, user.userId),
    with: {
      home_team: true,
      away_team: true,
    },
    orderBy: desc(games.date),
  });

  return gamesWithTeams;
};

// create game
export const createGame = async (game: ICreateAndUpdateGame) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const [newGame] = await db
    .insert(games)
    .values({
      ...game,
      gameweek_id: 1,
      user_id: user.userId,
      result: "Not Started",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return newGame;
};

// delete game
export const deleteGame = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const player = await db.query.players.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (player?.user_id !== user.userId) throw new Error("Unauthorized");

  const [deletedGame] = await db
    .delete(games)
    .where(eq(games.id, id))
    .returning();

  return deletedGame;
};
