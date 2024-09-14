import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTournament,
  deleteTournament,
  getTournament,
  updateTournament,
} from "~/server/db/queries/tournament";

import type {
  ICreateTournament,
  IUpdateTournament,
} from "../models/tournament";

// read
export const useGetTournaments = () => {
  return useQuery({
    queryFn: async () => await getTournament(),
    queryKey: ["tournaments"],
  });
};

// create
export const useCreateTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateTournament) => {
      return await createTournament(data);
    },
    onSuccess: async (data) => {
      try {
        if (data) {
          toast.success(`Tournament ${data.name} created successfully`);
        } else {
          toast.error("Tournament creation failed.");
        }

        await queryClient.invalidateQueries({
          queryKey: ["tournaments"],
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
export const useUpdateTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tournament: IUpdateTournament) => {
      return updateTournament(tournament);
    },
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Tournament updated successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["tournaments"],
          });
        } else {
          toast.error("Tournament update failed");
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
export const useDeleteTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tournament_id: number) => deleteTournament(tournament_id),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Tournament deleted successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["tournaments"],
          });
        } else {
          toast.error("Tournament deletion failed.");
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
