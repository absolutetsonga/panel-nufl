import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ICreateAndUpdateGame } from "../models/games";
import {
  createGame,
  deleteGame,
  getGames,
  getGame,
} from "~/server/db/queries/games";

// read one game
export const useGetGame = (team_id: number) => {
  return useQuery({
    queryFn: async () => await getGame(team_id),
    queryKey: ["games"],
  });
};

// read all games
export const useGetAllGames = () => {
  return useQuery({
    queryFn: async () => await getGames(),
    queryKey: ["games"],
  });
};

// create game
export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateAndUpdateGame) => {
      return await createGame(data);
    },
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Game created successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["gameweeks"],
          });
        } else {
          toast.error("Game creation failed.");
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
          toast.success(`Game deleted successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["games"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["games"],
          });
        } else {
          toast.error("Game deletion failed.");
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
