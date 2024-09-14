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
  user_id: varchar("user_id", { length: 256 }).notNull().unique(),
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
    tournament_id: integer("tournament_id")
      .notNull()
      .references(() => tournaments.id, { onDelete: "cascade" }),
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
  team_id: integer("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
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
  tournament_id: integer("tournament_id")
    .notNull()
    .references(() => tournaments.id, { onDelete: "cascade" }),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  number: integer("number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const games = createTable("game", {
  id: serial("id").primaryKey(),

  gameweek_id: integer("gameweek_id")
    .notNull()
    .references(() => gameweeks.id, { onDelete: "cascade" }),
  home_team_id: integer("home_team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  away_team_id: integer("away_team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  user_id: varchar("user_id", { length: 256 }).notNull(),

  venue: varchar("venue", { length: 256 }).notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  home_team_score: integer("home_team_score").default(-1).notNull(),
  away_team_score: integer("away_team_score").default(-1).notNull(),
  result: varchar("result", { length: 256 }).notNull(),
  match_report: varchar("match_report", { length: 256 }).default("").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const goals = createTable("goal", {
  id: serial("id").primaryKey(),

  user_id: varchar("user_id", { length: 256 }).notNull(),
  game_id: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  team_id: integer("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  player_id: integer("player_id")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),

  is_own_goal: boolean("is_own_goal").default(false),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const assists = createTable("assist", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  game_id: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  player_id: integer("player_id")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  goal_id: integer("goal_id")
    .notNull()
    .references(() => goals.id, { onDelete: "cascade" }),
  team_id: integer("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const clean_sheets = createTable("clean_sheet", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  game_id: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  player_id: integer("player_id")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  team_id: integer("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const cards = createTable("card", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  game_id: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  player_id: integer("player_id")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  team_id: integer("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  is_yellow: boolean("is_yellow").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

// relations
export const teamsRelations = relations(teams, ({ many }) => ({
  home_games: many(games, { relationName: "home_team" }),
  away_games: many(games, { relationName: "away_team" }),
  players: many(players, { relationName: "players" }),
}));

export const playersRelation = relations(players, ({ one, many }) => ({
  goals: many(goals, { relationName: "goals" }),
  team: one(teams, {
    fields: [players.team_id],
    references: [teams.id],
    relationName: "players",
  }),
}));

export const gameweeksRelations = relations(gameweeks, ({ many }) => ({
  games: many(games, { relationName: "games" }),
}));

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
    relationName: "games",
  }),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  player: one(players, {
    fields: [goals.player_id],
    references: [players.id],
    relationName: "goals",
  }),
}));
