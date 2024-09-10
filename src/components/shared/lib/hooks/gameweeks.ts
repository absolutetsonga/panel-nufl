import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGameweek,
  deleteGameweek,
  getGameweek,
  getGameweeks,
} from "~/server/db/queries/gameweeks";

// read one gameweek
export const useGetOneGameweek = (id: number) => {
  return useQuery({
    queryFn: async () => await getGameweek(id),
    queryKey: ["gameweeks"],
  });
};

// read all gameweeks
export const useGetAllGameweeks = () => {
  return useQuery({
    queryFn: async () => await getGameweeks(),
    queryKey: ["gameweeks"],
  });
};

// create gameweek
export const useCreateGameweek = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (number: number) => {
      return await createGameweek(number);
    },
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Gameweek created successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["gameweeks"],
          });
        } else {
          toast.error("Gameweek creation failed.");
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

// delete gameweek
export const useDeleteGameweek = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteGameweek(id),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Gameweek deleted successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["gameweeks"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["gameweeks"],
          });
        } else {
          toast.error("Gameweek deletion failed.");
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
