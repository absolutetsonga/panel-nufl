import { relations, sql } from "drizzle-orm";
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

export const teams = createTable(
  "team",
  {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", { length: 256 }).notNull(),
    tournament_id: integer("tournament_id").notNull(),
    name: varchar("name", { length: 256 }).notNull(),
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
  level_of_study: varchar("level_of_study", { length: 256 })
    .notNull()
    .default(""),

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

export const gameweeks = createTable("gameweek", {
  id: serial("id").primaryKey(),
  tournament_id: integer("tournament_id").notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  number: integer("number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const games = createTable("game", {
  id: serial("id").primaryKey(),

  gameweek_id: integer("gameweek_id").notNull(),
  home_team_id: integer("home_team_id").notNull(),
  away_team_id: integer("away_team_id").notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(),

  venue: varchar("venue", { length: 256 }).notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  home_team_score: integer("home_team_score").default(-1),
  away_team_score: integer("away_team_score").default(-1),
  result: varchar("result", { length: 256 }).notNull(),
  match_report: varchar("match_report", { length: 256 }).default(""),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const goals = createTable("goal", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  game_id: integer("game_id").notNull(),
  player_id: integer("player_id").notNull(),
  is_own_goal: boolean("is_own_goal").default(false),
});

export const assists = createTable("assist", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  game_id: integer("game_id").notNull(),
  player_id: integer("player_id").notNull(),
  goal_id: integer("goal_id").notNull(),
});

export const clean_sheets = createTable("clean_sheet", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  game_id: integer("game_id").notNull(),
  player_id: integer("player_id").notNull(),
});

export const cards = createTable("card", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  game_id: integer("game_id").notNull(),
  player_id: integer("player_id").notNull(),
  is_yellow: boolean("is_yellow").notNull(),
});

// relations
export const gamesRelations = relations(games, ({ one }) => ({
  home_team: one(teams, {
    fields: [games.home_team_id],
    references: [teams.id],
    relationName: "home_team",
  }),
  away_team: one(teams, {
    fields: [games.away_team_id],
    references: [teams.id],
    relationName: "away_team",
  }),
  gameweek: one(gameweeks, {
    fields: [games.gameweek_id],
    references: [gameweeks.id],
  }),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
  home_games: many(games, { relationName: "home_team" }),
  away_games: many(games, { relationName: "away_team" }),
}));

export const gameweeksRelations = relations(gameweeks, ({ many }) => ({
  games: many(games),
}));

// i need to create relations for gameweeks and games
// gameweeks can have many games, and game can have one gameweek
