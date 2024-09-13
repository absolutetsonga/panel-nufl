import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCards, createCard } from "~/server/db/queries/cards";
import { ICreateCard } from "../models/games";

// read assists
export const useGetCards = (gameId: number) => {
  return useQuery({
    queryFn: async () => await getCards(gameId),
    queryKey: ["cards"],
  });
};

// create assist
export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (card: ICreateCard) => {
      return await createCard(card);
    },
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Card created successfully`);
          await queryClient.invalidateQueries({
            queryKey: ["cards"],
          });
        } else {
          toast.error("Card creation failed.");
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
