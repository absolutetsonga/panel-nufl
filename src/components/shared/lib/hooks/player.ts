import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlayer,
  deletePlayer,
  getPlayer,
  getOneClubPlayers,
  updatePlayer,
} from "~/server/db/queries/player";
import type { ICreateAndUpdatePlayer } from "../models/team";

// read players
export const useGetOneClubPlayers = (team_id: number) => {
  return useQuery({
    queryFn: async () => await getOneClubPlayers(team_id),
    queryKey: ["players"],
  });
};

// read player
export const useGetPlayer = (player_id: number) => {
  return useQuery({
    queryFn: async () => await getPlayer(player_id),
    queryKey: ["players", player_id],
  });
};

// create player
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateAndUpdatePlayer) => {
      return await createPlayer(data);
    },
    onSuccess: async (data) => {
      try {
        if (data) {
          toast(`Player ${data.fullname ?? ""} created successfully`);
        } else {
          toast("Player creation failed.");
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
    mutationFn: ({
      player_id,
      player,
    }: {
      player_id: number;
      player: ICreateAndUpdatePlayer;
    }) => updatePlayer(player_id, player),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast(`Player updated successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["players", data.id],
          });
          await queryClient.invalidateQueries({
            queryKey: ["team", data.team_id],
          });
        } else {
          toast("Player update failed");
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
          toast(`Player deleted successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["players", data.team_id],
          });
          await queryClient.invalidateQueries({
            queryKey: ["team", data.team_id],
          });
        } else {
          toast("Player deletion failed.");
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
