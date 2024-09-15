import type { ITeamPlayer } from "./player";

export interface ITeam {
  id: number;
  name: string;
  user_id: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  team_players: ITeamPlayer[];
}

export interface ITeamForPlayer {
  id: number;
  name: string;
  user_id: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface ICreateTeam {
  image: string;
  name: string;
}

export interface IUpdateTeam {
  id: number;
  image: string;
  name: string;
}
