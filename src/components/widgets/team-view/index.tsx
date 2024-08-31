"use client";

import { redirect } from "next/navigation";

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
    <div className="flex max-w-[400px] flex-col items-center justify-center overflow-hidden rounded-2xl border-[1px] border-black">
      <div className="flex-shrink flex-grow">
        <Image
          src={image ?? "/placeholder-image.png"}
          alt={name ?? "Team Image"}
          className="h-[200px] w-[200px] rounded-xl object-cover md:h-[400px] md:w-[400px]"
          width={400}
          height={400}
        />
      </div>
      <div className="flex w-full flex-row">
        <TeamActions
          isEditing={isEditing}
          onEditToggle={setIsEditing}
          onDeleteToggle={() => setDeleteAlertToggle(true)}
          onRedirect={() => redirect(`/`)}
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
        <div className="flex h-full w-4/5 flex-1 flex-shrink-0 flex-col border-l">
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
              <div className="p-2">
                <div>Created On:</div>
                <div>{team.createdAt.toLocaleDateString()}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
