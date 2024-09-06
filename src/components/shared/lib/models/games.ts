export interface IGame {
  id: number;
  user_id: string;
  home_team_id: number;
  away_team_id: number;
  goals: number;
}

export interface IGoal {
  id: number;
  user_id: string;
  game_id: number;
  player_id: number;
  is_own_goal: boolean;
}

export interface IAssist {
  id: number;
  user_id: string;
  game_id: number;
  player_id: number;
  goal_id: number;
}

export interface ICleanSheet {
  id: number;
  user_id: string;
  game_id: number;
  player_id: number;
}

export interface ICard {
  id: number;
  user_id: string;
  game_id: number;
  player_id: number;
  is_yellow: boolean;
}