"use client";

import { PencilIcon, Trash2Icon, XIcon } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeletePlayer,
  useGetPlayer,
} from "~/components/shared/lib/hooks/player";

import { Button, PageContainer } from "~/components/shared/ui";
import { PlayerUpdateForm } from "~/components/widgets/forms/player-update-form";
import { PlayerView } from "./player-view";
import { DeleteAlert } from "~/components/entities/delete-alert/ui";

export const PlayerPage = ({ playerId }: { playerId: string }) => {
  const player_id = Number(playerId);
  if (Number.isNaN(player_id)) throw new Error("Invalid player id");

  const router = useRouter();
  const { mutate: server_deletePlayer } = useDeletePlayer();
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);
  const { data: player, isLoading, isError } = useGetPlayer(player_id);

  if (isLoading) return <PageContainer>Loading...</PageContainer>;
  if (isError) return <PageContainer>Error loading player.</PageContainer>;
  if (!player) throw new Error("Player not found");

  const onDelete = (id: number) => {
    server_deletePlayer(player.id);
    router.push(`/teams/${player.team_id}`);
  };

  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <div className="relative flex flex-row items-center justify-center">
          <PlayerView player={player} />

          <div className="absolute right-0 top-0 gap-6 p-2">
            <div className="flex flex-row gap-4">
              <PencilIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setEditToggle(true)}
              />
              <Trash2Icon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setDeleteToggle(true)}
              />
            </div>
          </div>
        </div>

        {editToggle && (
          <PlayerUpdateForm
            toggle={editToggle}
            setToggle={setEditToggle}
            player={player}
          />
        )}

        {deleteToggle && (
          <DeleteAlert
            trigger="Delete?"
            title={`Delete Team`}
            description="Are you sure? This action cannot be undone. This will permanently delete this team and remove all games, scores, players, their goals, assists, clean sheets data with this team from our servers. In special cases we recommend to contact with developer to delete the team."
            onConfirm={() => onDelete(player.id)}
            onCancel={() => setDeleteAlertToggle(false)}
          />
        )}
      </div>
    </PageContainer>
  );
};
