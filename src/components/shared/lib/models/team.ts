export interface ICreateTournament {
  name: string;
}

export interface IUpdateTournament {
  id: number;
  name: string;
}

export interface ITeam {
  id: number;
  name: string;
  user_id: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  team_players: ITeamPlayer[];
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

export interface ICreatePlayer {
  team_id: number;
  fullname: string;
  image: string;
  position: string;
  level_of_study: string;
  school: string;
  age?: Date;
  year: number;
}

export interface IUpdatePlayer {
  id: number;
  team_id: number;
  fullname: string;
  image: string;
  position: string;
  level_of_study: string;
  school: string;
  age?: Date;
  year: number;
}

export interface ITeamPlayer {
  id: number;
  team_id: number;
  user_id: string;
  age: Date;
  fullname: string;
  image: string;
  year: number;
  school: string;
  level_of_study: string;
  position: string;
  played_matches: number;
  goals: number;
  assists: number;
  clean_sheets: number;
  yellow_cards: number;
  red_cards: number;
  createdAt: Date;
  updatedAt: Date | null;
}
