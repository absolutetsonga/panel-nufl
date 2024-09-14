import { ITeamPlayer } from "./team";

export interface IGame {
  id: number;
  user_id: string;
  home_team_id: number;
  away_team_id: number;

  venue: string;
  date: Date;
  home_team_score: number;
  away_team_score: number;
  result: string;
  match_report: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IGameInGameweeks {
  id: number;
  user_id: string;
  home_team_id: number;
  away_team_id: number;

  venue: string;
  date: Date;
  home_team_score: number;
  away_team_score: number;
  result: string;
  match_report: string;

  createdAt: Date;
  updatedAt: Date;

  home_team: {
    id: number;
    name: string;
    user_id: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
  away_team: {
    id: number;
    name: string;
    user_id: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
}

export interface IGameInGameweeksWithTeamPlayers {
  id: number;
  user_id: string;
  home_team_id: number;
  away_team_id: number;

  venue: string;
  date: Date;
  home_team_score: number;
  away_team_score: number;
  result: string;
  match_report: string;

  createdAt: Date;
  updatedAt: Date;

  home_team: {
    id: number;
    user_id: string | null;
    name: string;
    players: ITeamPlayer[];
    image: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
  away_team: {
    id: number;
    user_id: string | null;
    name: string;
    players: ITeamPlayer[];
    image: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
}

export interface ICreateGame {
  home_team_id: number;
  away_team_id: number;
  gameweek_id: number;
  venue: string;
  date: Date;
  match_report: string;
}

export interface IUpdateGame {
  game_id: number;
  home_team_id: number;
  away_team_id: number;
  venue: string;
  date: Date;
  match_report: string;
}

export interface IGoal {
  id: number;
  user_id: string;
  game_id: number;
  team_id: number;
  player_id: number;
  is_own_goal: boolean;
}

export interface ICreateGoal {
  game_id: number;
  player_id: number;
  team_id: number;
  is_own_goal: boolean;
}

export interface IAssist {
  id: number;
  user_id: string;
  game_id: number;
  player_id: number;
  team_id: number;
  goal_id: number;
}

export interface ICreateAssist {
  game_id: number;
  player_id: number;
  goal_id: number;
  team_id: number;
}

export interface ICleanSheet {
  id: number;
  user_id: string;
  game_id: number;
  player_id: number;
  team_id: number;
}

export interface ICard {
  id: number;
  user_id: string;
  game_id: number;
  player_id: number;
  team_id: number;
  is_yellow: boolean;
}

export interface ICreateCard {
  user_id: string;
  game_id: number;
  player_id: number;
  team_id: number;
  is_yellow: boolean;
}

export interface IGameWeek {
  id: number;
  user_id: string;
  number: number;
  team_id: number;
  createdAt: Date;
  updatedAt: Date;
}
