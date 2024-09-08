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
    message: "Sorry, major is mandatory.",
  }),
  school: z.string().min(2, {
    message: "Sorry, school is mandatory.",
  }),
  year: z.number().min(0, {
    message: "Please, provide course year.",
  }),
  age: z.date().optional(),
});

export const teamSchema = z.object({
  name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  image: z.string().url({
    message: "Please upload a valid team image URL.",
  }),
});

export const tournamentSchema = z.object({
  name: z.string().min(2, {
    message: "Tounament name must be at least 2 characters.",
  }),
});

export const gameweekSchema = z.object({
  number: z.number().min(1, {
    message: "Please, provide a gameweek number.",
  }),
});

export const gameSchema = z.object({
  home_team_id: z.number(),
  away_team_id: z.number(),
  date: z.date(),
  venue: z.string().min(2, {
    message: "Please select a venue.",
  }),
  match_report: z.string().default(""),
});
