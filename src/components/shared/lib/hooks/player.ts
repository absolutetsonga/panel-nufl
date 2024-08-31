import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlayer,
  deletePlayer,
  getPlayer,
  getOneClubPlayers,
  updatePlayer,
} from "~/server/db/queries/player";

interface ICreatePlayer {
  team_id: number;
  fullname: string;
  image: string;
  position:
    | "Goalkeeper"
    | "Defender"
    | "Left Winger"
    | "Right Winger"
    | "Striker";
  major: string;
  age: string;
}

// read players
export const useGetOneClubPlayers = (team_id: number) => {
  return useQuery({
    queryFn: async () => await getOneClubPlayers(team_id),
    queryKey: ["players"],
  });
};

// create player
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreatePlayer) => {
      return await createPlayer({ ...data, age: Number(data.age) });
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
