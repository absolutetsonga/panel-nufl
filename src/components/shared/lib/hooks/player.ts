import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlayer,
  deletePlayer,
  getPlayer,
  getPlayers,
  updatePlayer,
} from "~/server/db/queries/player";
import type { ICreatePlayer, IUpdatePlayer } from "../models/team";

// read player
export const useGetPlayer = (player_id: number) => {
  return useQuery({
    queryFn: async () => await getPlayer(player_id),
    queryKey: ["players", player_id],
  });
};

// read players
export const useGetPlayers = (team_id: number) => {
  return useQuery({
    queryFn: async () => await getPlayers(team_id),
    queryKey: ["players"],
  });
};

// create player
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreatePlayer) => {
      return await createPlayer(data);
    },
    onSuccess: async (data) => {
      try {
        if (data) {
          toast.success(`Player ${data.fullname ?? ""} created successfully`);
        } else {
          toast.error("Player creation failed.");
        }

        await queryClient.invalidateQueries({
          queryKey: ["players", data?.team_id],
        });
        await queryClient.invalidateQueries({
          queryKey: ["team", data?.team_id],
        });
      } catch (error) {
        console.error("Error invalidating queries:", error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// update
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ player }: { player: IUpdatePlayer }) => updatePlayer(player),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Player updated successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["players", data.id],
          });
          await queryClient.invalidateQueries({
            queryKey: ["team", data.team_id],
          });
        } else {
          toast.error("Player update failed");
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
// delete
export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (player_id: number) => deletePlayer(player_id),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Player deleted successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["players", data.team_id],
          });
          await queryClient.invalidateQueries({
            queryKey: ["team", data.team_id],
          });
        } else {
          toast.error("Player deletion failed.");
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
