import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlayer,
  deletePlayer,
  getPlayer,
  getOneClubPlayers,
  updatePlayer,
} from "~/server/db/queries/player";

interface ICreatePlayer {
    team_id: number;
    fullname: string;
    image: string;
    position:
        | "Goalkeeper"
        | "Defender"
        | "Left Winger"
        | "Right Winger"
        | "Striker";
    major: string;
    age: number;
    played_matches: number;
    goals: number;
    assists: number;
    clean_sheets: number;
    yellow_cards: number;
    red_cards: number;
}

export const useGetOneClubPlayers = (team_id: number) => {
  return useQuery({
    queryFn: async () => await getOneClubPlayers(team_id),
    queryKey: ["teams"],
  });
};
