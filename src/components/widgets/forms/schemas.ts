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
  year: z.string().min(1, {
    message: "Please, provide course year.",
  }),
  age: z.date().optional(),
});
