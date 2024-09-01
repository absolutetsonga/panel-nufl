import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `panel-nufl_${name}`);

export const teams = createTable(
  "team",
  {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", { length: 256 }),
    tournament_id: integer("tournament_id").notNull(),
    name: varchar("name", { length: 256 }),
    image: varchar("image", { length: 1024 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const players = createTable("player", {
  id: serial("id").primaryKey(),
  team_id: integer("team_id").notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(),

  fullname: varchar("fullname", { length: 256 }).notNull(),
  image: varchar("image", { length: 1024 }).notNull(),
  position: varchar("position", { length: 256 }).notNull().default(""),
  school: varchar("school", { length: 256 }).notNull().default(""),
  level_of_study: varchar("level_of_study", { length: 256 }).notNull().default(""),

  age: timestamp("age").notNull().defaultNow(),
  year: integer("year").notNull().default(0),
  played_matches: integer("played_matches").notNull().default(0),
  goals: integer("goals").notNull().default(0),
  assists: integer("assists").notNull().default(0),
  clean_sheets: integer("clean_sheets").notNull().default(0),
  yellow_cards: integer("yellow_cards").notNull().default(0),
  red_cards: integer("red_cards").notNull().default(0),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const tournaments = createTable("tournament", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const games = createTable("game", {
  id: serial("id").primaryKey(),
  home_team_id: integer("home_team_id").notNull(),
  away_team_id: integer("away_team_id").notNull(),
  goals: integer("goal_id").notNull(),
});

export const goals = createTable("goal", {
  id: serial("id").primaryKey(),
  game_id: integer("game_id").notNull(),
  player_id: integer("player_id").notNull(),
  is_own_goal: boolean("is_own_goal").default(false),
});

export const assists = createTable("assist", {
  id: serial("id").primaryKey(),
  game_id: integer("game_id").notNull(),
  player_id: integer("player_id").notNull(),
  goal_id: integer("goal_id").default(0),
});

export const clean_sheets = createTable("clean sheet", {
  id: serial("id").primaryKey(),
  game_id: integer("game_id").notNull(),
  player_id: integer("player_id").notNull(),
});

export const cards = createTable("card", {
  id: serial("id").primaryKey(),
  game_id: integer("game_id").notNull(),
  player_id: integer("player_id").notNull(),
  is_yellow: boolean("is_yellow").default(false),
});
