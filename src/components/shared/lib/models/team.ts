export interface ITeam {
  id: number;
  name: string;
  user_id: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  team_players: ITeamPlayer[];
}

export interface ITeamPlayer {
  id: number;
  team_id: number;
  user_id: string;
  fullname: string;
  image: string | null;
  position: string;
  major: string;
  age: number;
  played_matches: number;
  goals: number;
  assists: number;
  clean_sheets: number;
  yellow_cards: number;
  red_cards: number;
  createdAt: Date;
  updatedAt: Date | null;
}
