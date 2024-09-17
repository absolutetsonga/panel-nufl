export interface ICard {
  id: number;
  user_id: string;
  game_id: number;
  player_id: number;
  team_id: number;
  is_yellow: boolean;
}

export interface ICreateCard {
  player_id: number;
  is_yellow: boolean;
  team_id: number;
  game_id: number;
}
