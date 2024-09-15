import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlayer,
  deletePlayer,
  getPlayer,
  getPlayers,
  updatePlayer,
  updatePlayerAssistScore,
  updatePlayerGoalScore,
  updatePlayerOwnGoalScore,
} from "~/server/db/queries/player";
import type {
  ICreatePlayer,
  IUpdatePlayer,
  IUpdatePlayerAssistScore,
  IUpdatePlayerGoalScore,
  IUpdatePlayerOwnGoalScore,
} from "../models/player";

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

// update goals
export const useUpdatePlayerGoalScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ player }: { player: IUpdatePlayerGoalScore }) =>
      updatePlayerGoalScore(player),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(
            `Player ${data.fullname} goal score updated successfully`,
          );
          await queryClient.invalidateQueries({
            queryKey: ["players", data.id],
          });
        } else {
          toast.error(`Player goal score update failed`);
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

// update own goals
export const useUpdatePlayerOwnGoalScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ player }: { player: IUpdatePlayerOwnGoalScore }) =>
      updatePlayerOwnGoalScore(player),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(
            `Player ${data.fullname} own goal score updated successfully`,
          );
          await queryClient.invalidateQueries({
            queryKey: ["players", data.id],
          });
        } else {
          toast.error(`Player own goal score update failed`);
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

// update assist
export const useUpdatePlayerAssistScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ player }: { player: IUpdatePlayerAssistScore }) =>
      updatePlayerAssistScore(player),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(
            `Player ${data.fullname} assist score updated successfully`,
          );
          await queryClient.invalidateQueries({
            queryKey: ["players", data.id],
          });
        } else {
          toast.error("Player assist score update failed");
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

// update card score:
// export const useUpdateCardScore = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (card: IUpdatePlayerCardScore) => {
//       return await updatePlayerCardScore(card);
//     },
//     onSuccess: async (data) => {
//       try {
//         if (data && !(data instanceof Error)) {
//           toast.success(`Game score updated successfully`);
//           await queryClient.invalidateQueries({
//             queryKey: ["games"],
//           });
//         } else {
//           toast.error("Game score update failed.");
//         }
//       } catch (error) {
//         console.error("Error invalidating queries:", error);
//       }
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };

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
