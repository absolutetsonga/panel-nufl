import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateAssist } from "../models/games";
import { createAssist, getAssists } from "~/server/db/queries/assists";

// read assists
export const useGetAssists = (gameId: number) => {
  return useQuery({
    queryFn: async () => await getAssists(gameId),
    queryKey: ["assists"],
  });
};

// create assist
export const useCreateAssist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assist: ICreateAssist) => {
      return await createAssist(assist);
    },
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Assist created successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["assists"],
          });
        } else {
          toast.error("Assist creation failed.");
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
