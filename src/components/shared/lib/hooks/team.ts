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
    mutationFn: (team: ITeamCreate) => createTeam(team),
    onSuccess: async (data) => {
      try {
        if (data) {
          toast.success(`Team ${data.name ?? ""} created successfully`);
        } else {
          toast.error("Team creation failed.");
        }
        await queryClient.invalidateQueries({ queryKey: ["teams"] });
      } catch (error) {
        console.error("Error creating team:", error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.error("Error creating team:", error);
    },
  });
}

// update
export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (team: ITeamUpdate) => updateTeam(team),
    onSuccess: async (data) => {
      try {
        if (data && !(data instanceof Error)) {
          toast.success(`Team ${data.name ?? ""} updated successfully`);
          await queryClient.invalidateQueries({ queryKey: ["team", data.id] });
        } else {
          toast.error("Team update failed.");
        }
      } catch (error) {
        console.error("Error updating team", error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
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
          toast.success(`Team ${data?.name ?? ""} deleted successfully`);
        } else {
          toast.error("Team deletion failed.");
        }
        await queryClient.invalidateQueries({ queryKey: ["teams"] });
      } catch (error) {
        console.error("Error deleting team:", error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.error("Error deleting team:", error);
    },
  });
}
