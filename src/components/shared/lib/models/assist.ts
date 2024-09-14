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
