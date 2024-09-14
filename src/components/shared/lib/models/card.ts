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
