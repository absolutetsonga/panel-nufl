export interface IAssist {
  id: number;
  user_id: string;
  game_id: number;
  player_id: number;
  team_id: number;
  goal_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAssist {
  game_id: number;
  player_id: number;
  goal_id: number;
  team_id: number;
}
