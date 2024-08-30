"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { teams } from "../schema";
import { eq } from "drizzle-orm";

// read
export const getTeam = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const team = await db.query.teams.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!team) throw new Error("Team not found");
  if (team.user_id !== user.userId) throw new Error("Unauthorized");

  return team
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
// export const updateTeam = async (id: number, name: string, image: string) => {
//   const user = auth();
//   if (!user.userId) return Error("Unauthorized");

//   try {
//     return updatedTeam;
//   } catch (error) {
//     // Handle other potential errors here
//     console.error("Error updating team:", error);
//     throw new Error("Error updating team");
//   }
// };
// deleteTeam
