import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `panel-nufl_${name}`);

export const teams = createTable(
  "team",
  {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", { length: 256 }),
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
  image: varchar("image", { length: 1024 }).default(sql`null`),
  position: varchar("position", { length: 256 }).notNull().default(""),
  major: varchar("major", { length: 256 }).notNull().default(""),
  age: integer("age").notNull().default(0),
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
