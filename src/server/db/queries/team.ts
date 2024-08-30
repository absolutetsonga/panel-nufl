import "server-only";
import { db } from "..";

export const getTeams = () => {
  return db.query.teams.findMany();
};
