"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { players } from "../schema";
import { eq } from "drizzle-orm";

interface ICreatePlayer {
  team_id: number;
  fullname: string;
  image: string;
  position:
    | "Goalkeeper"
    | "Defender"
    | "Left Winger"
    | "Right Winger"
    | "Striker";
  major: string;
  age: number;
}

// read
export const getPlayer = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const player = await db.query.players.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!player) throw new Error("Player not found");
  if (player.user_id !== user.userId) throw new Error("Unauthorized");

  return player;
};

// read one club players
export const getOneClubPlayers = async (team_id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.players.findMany({
    where: eq(players.team_id, team_id),
  });
};

// create player
export const createPlayer = async (player: ICreatePlayer) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const [newPlayer] = await db
    .insert(players)
    .values({
      ...player,
      user_id: user.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return newPlayer;
};

// update player
export const updatePlayer = async (id: number, player: ICreatePlayer) => {
  const user = auth();
  if (!user.userId) return Error("Unauthorized");

  const [updatedPlayer] = await db
    .update(players)
    .set({
      ...player,
      updatedAt: new Date(),
    })
    .where(eq(players.id, id))
    .returning();

  return updatedPlayer;
};

// delete player
export const deletePlayer = async (id: number) => {
  const user = auth();
  if (!user.userId) return Error("Unauthorized");
  
  const player = await db.query.players.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (player?.user_id !== user.userId) throw new Error("Unauthorized");

  const [deletedPlayer] = await db
    .delete(players)
    .where(eq(players.id, id))
    .returning();

  return deletedPlayer;
};
