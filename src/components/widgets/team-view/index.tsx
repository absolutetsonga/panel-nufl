"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useDeleteTeam } from "~/components/shared/lib/hooks/team";
import { useRouter } from "next/navigation";
import { DeleteAlert } from "~/components/entities/delete-alert/ui";
import { TeamActions } from "./components/team-actions";
import { TeamUpdateForm } from "../forms/team-update-form";

type TeamViewProps = {
  team: {
    id: number;
    name: string | null;
    image: string | null;
    createdAt: Date;
  };
};

export const TeamView = ({ team }: TeamViewProps) => {
  const { mutate: server_deleteTeam } = useDeleteTeam();

  const [isEditing, setIsEditing] = useState(false);
  const [deleteAlertToggle, setDeleteAlertToggle] = useState(false);
  const router = useRouter();

  const { id, name, image } = team;

  const onDelete = (team_id: number) => {
    server_deleteTeam({ id: team_id });
    router.push("/teams");
  };

  return (
    <div className="flex flex-row">
      <Image
        src={image ?? "/placeholder-image.png"}
        alt={name ?? "Team Image"}
        className="h-[200px] w-[200px] rounded-xl object-cover"
        width={200}
        height={200}
      />
      <div className="flex flex-col flex-1">
        <div className="flex h-full flex-1 flex-shrink-0 flex-col">
          {isEditing && (
            <TeamUpdateForm
              toggle={isEditing}
              setToggle={setIsEditing}
              team={{ id, name: name, image: image }}
            />
          )}
          {!isEditing && (
            <>
              <div className="border-b p-2 text-center text-xl">
                {team.name}
              </div>
              <div className="p-2">Created On: {team.createdAt.toLocaleDateString()}</div>
            </>
          )}
        </div>
        <TeamActions
          isEditing={isEditing}
          onEditToggle={setIsEditing}
          onDeleteToggle={() => setDeleteAlertToggle(true)}
        />

        {deleteAlertToggle && (
          <DeleteAlert
            trigger="Delete?"
            title={`Delete ${name} Team`}
            description="Are you sure? This action cannot be undone. This will permanently delete this team and remove all games, scores, players, their goals, assists, clean sheets data with this team from our servers. In special cases we recommend to contact with developer to delete the team."
            onConfirm={() => onDelete(id)}
            onCancel={() => setDeleteAlertToggle(false)}
          />
        )}
      </div>
    </div>
  );
};
