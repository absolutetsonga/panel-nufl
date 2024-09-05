import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTeam,
  deleteTeam,
  getTeam,
  getTeams,
  updateTeam,
} from "~/server/db/queries/team";

interface ITeamCreate {
  name: string;
  image: string;
}

interface ITeamUpdate {
  id: number;
  name: string;
  image: string;
}

// read teams
export function useGetTeams() {
  return useQuery({
    queryFn: async () => await getTeams(),
    queryKey: ["teams"],
  });
}

// read team
export function useGetTeam(id: number) {
  return useQuery({
    queryFn: async () => getTeam(id),
    queryKey: ["team", id],
  });
}

// create
export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, image }: ITeamCreate) => createTeam(name, image),
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
export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name, image }: ITeamUpdate) =>
      updateTeam(id, name, image),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast(`Team ${data.name ?? ""} updated successfully`);
          await queryClient.invalidateQueries({ queryKey: ["team", data.id] });
        } else {
          toast("Team update failed.");
        }
      } catch (error) {
        console.error("Error invalidating queries:", error);
      }
    },
    onError: (error) => {
      toast("Error");
      console.error("Error updating team:", error);
    },
  });
}

// delete
export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTeam(id),
    onSuccess: async (data) => {
      try {
        if (data) {
          toast(`Team ${data?.name ?? ""} deleted successfully`);
        } else {
          toast("Team deletion failed.");
        }
        await queryClient.invalidateQueries({ queryKey: ["teams"] });
      } catch (error) {
        console.error("Error invalidating queries:", error);
      }
    },
    onError: (error) => {
      toast("Error");
      console.error("Error deleting team:", error);
    },
  });
}
