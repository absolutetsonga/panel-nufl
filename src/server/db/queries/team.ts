"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { teams } from "../schema";
import { eq } from "drizzle-orm";

// read
export const getTeams = async () => {
  const user = auth();
  if (!user.userId) throw new Error("unauthorized");

  return await db.query.teams.findMany({
    where: eq(teams.user_id, user.userId),
  });
};

// create
export const createTeam = async (name: string, image: string) => {
  const user = auth();

  if (!user.userId) return Error("Unauthorized");

  const [newTeam] = await db
    .insert(teams)
    .values({
      name,
      image,
      user_id: user.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return newTeam;
};

// updateTeam

// deleteTeam
