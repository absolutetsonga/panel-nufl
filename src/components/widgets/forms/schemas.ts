import { z } from "zod";

export const playerSchema = z.object({
  fullname: z.string().min(2, {
    message: "Player fullname must be at least 2 characters.",
  }),
  image: z
    .string()
    .url()
    .default(
      "https://utfs.io/f/aeb9ab9b-7970-4eed-8fc1-92ac644c1165-clf4u5.jpg",
    ),
  position: z.string(),
  level_of_study: z.string().min(2, {
    message: "Major is mandatory.",
  }),
  school: z.string().min(2, {
    message: "School is mandatory.",
  }),
  year: z.number().min(0, {
    message: "Provide course year.",
  }),
  age: z.date().optional(),
});

export const teamSchema = z.object({
  name: z.string().min(2, {
    message: "Team name is mandatory.",
  }),
  image: z.string().url({
    message: "Please upload an image.",
  }),
});

export const tournamentSchema = z.object({
  name: z.string().min(2, {
    message: "Tournament name is mandatory",
  }),
});

export const gameweekSchema = z.object({
  number: z.number().min(1, {
    message: "Gameweek number is mandatory.",
  }),
});

export const gameSchema = z.object({
  home_team_id: z.number(),
  away_team_id: z.number(),
  date: z.date(),
  venue: z.string().min(2, {
    message: "Venue is mandatory.",
  }),
  match_report: z.string().default(""),
});

export const goalSchema = z.object({
  player_id: z.number(),
  is_own_goal: z.boolean(),
});

export const assistSchema = z.object({
  player_id: z.number(),
  goal_id: z.number(),
});

export const cardSchema = z.object({
  player_id: z.number(),
  is_yellow: z.boolean(),
});
