import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTournament,
  deleteTournament,
  getTournaments,
  updateTournament,
} from "~/server/db/queries/tournament";

interface ICreateTournament {
  name: string;
  user_id: string;
}

interface IUpdateTournament {
  id: number;
  name: string;
  user_id: string;
}

// read
export const useGetTournaments = () => {
  return useQuery({
    queryFn: async () => await getTournaments(),
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
          toast(`Tournament ${data.name} created successfully`);
        } else {
          toast("Tournament creation failed.");
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
          toast(`Tournament updated successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["tournaments"],
          });
        } else {
          toast("Tournament update failed");
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
          toast(`Tournament deleted successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["tournaments"],
          });
        } else {
          toast("Tournament deletion failed.");
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
