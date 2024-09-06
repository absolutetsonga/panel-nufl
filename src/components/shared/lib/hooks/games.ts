import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IGame } from "../models/games";
import {
  createGame,
  deleteGame,
  getAllGames,
  getGame,
} from "~/server/db/queries/games";

// read one game
export const useGetOneClubPlayers = (team_id: number) => {
  return useQuery({
    queryFn: async () => await getGame(team_id),
    queryKey: ["games"],
  });
};

// read all games
export const useGetAllGames = () => {
  return useQuery({
    queryFn: async () => await getAllGames(),
    queryKey: ["games"],
  });
};

// create game
export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IGame) => {
      return await createGame(data);
    },
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast(`Game created successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["games", data.user_id],
          });
        } else {
          toast("Game creation failed.");
        }
      } catch (error) {
        console.error("Error invalidating queries:", error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// delete game
export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteGame(id),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast(`Game deleted successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["games", data.user_id],
          });
          await queryClient.invalidateQueries({
            queryKey: ["games", data.user_id],
          });
        } else {
          toast("Game deletion failed.");
        }
      } catch (error) {
        console.error("Error invalidating queries:", error);
        toast.error("Error");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
