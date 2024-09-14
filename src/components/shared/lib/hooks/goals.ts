import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGoal, getGoals, deleteGoal } from "~/server/db/queries/goals";
import type { ICreateGoal } from "../models/games";

// read goals in game
export const useGetGoals = (gameId: number) => {
  return useQuery({
    queryFn: async () => await getGoals(gameId),
    queryKey: ["goals"],
  });
};

// create goal
export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goal: ICreateGoal) => {
      return await createGoal(goal);
    },
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Goal created successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["goals"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["games"],
          });
        } else {
          toast.error("Goal creation failed.");
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

// delete goal
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteGoal(id),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Goal deleted successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["goals"],
          });
        } else {
          toast.error("Goal deletion failed.");
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
