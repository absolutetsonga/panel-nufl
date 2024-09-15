export interface IGoal {
  id: number;
  user_id: string;
  game_id: number;
  team_id: number;
  player_id: number;
  is_own_goal: boolean;
}

export interface ICreateGoal {
  player_id: number;
  assist_player_id?: number | undefined;
  is_own_goal: boolean;
}
