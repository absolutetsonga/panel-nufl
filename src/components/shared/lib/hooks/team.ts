import { toast } from "sonner";

import { useMutation, useQuery } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: ({ name, image }: ITeam) => createTeam(name, image),
    onSuccess: (data) => {
      if (data) {
        toast(`Team ${data.name ?? ""} created successfully`);
      } else {
        toast("Team creation failed.");
      }
    },
    onError: (error) => {
      toast("Error");
      console.error("Error creating team:", error);
    },
  });
}
