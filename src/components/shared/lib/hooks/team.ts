import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTeam, getTeams } from "~/server/db/queries/team";

interface ITeam {
  name: string;
  image: string;
}

// read
export function useGetTeams() {
  return useQuery({
    queryFn: async () => await getTeams(),
    queryKey: ["teams"],
  });
}

// create
export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, image }: ITeam) => createTeam(name, image),
    onSuccess: async (data) => {
      try {
        if (data) {
          toast(`Team ${data.name ?? ""} created successfully`);
        } else {
          toast("Team creation failed.");
        }
        await queryClient.invalidateQueries({ queryKey: ["teams"] });
      } catch (error) {
        console.error("Error invalidating queries:", error);
      }
    },
    onError: (error) => {
      toast("Error");
      console.error("Error creating team:", error);
    },
  });
}

// update

// delete
