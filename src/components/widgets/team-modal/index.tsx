"use client";

import { redirect } from "next/navigation";

import React, { useState } from "react";
import Image from "next/image";
import { useDeleteTeam, useGetTeam } from "~/components/shared/lib/hooks/team";
import { useRouter } from "next/navigation";
import { DeleteAlert } from "~/components/entities/delete-alert/ui";
import { TeamActions } from "./components/team-actions";
import { TeamUpdateForm } from "../forms/team-update-form";

export const TeamModalView = (props: { teamId: string }) => {
  const team_id = Number(props.teamId);

  const [isEditing, setIsEditing] = useState(false);
  const [deleteAlertToggle, setDeleteAlertToggle] = useState(false);
  const { mutate: server_deleteTeam } = useDeleteTeam();
  const router = useRouter();

  // Checkers
  if (Number.isNaN(team_id)) throw new Error("Invalid team id");
  const { data: team, isLoading, isError } = useGetTeam(team_id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading team.</div>;
  if (!team) throw new Error("Team not found");
  const { id, name, image } = team;

  const onDelete = (team_id: number) => {
    server_deleteTeam({ id: team_id });
    router.push("/teams");
  };

  return (
    <div className="max-w-[400px] border-[1px] border-black rounded-2xl overflow-hidden flex flex-col items-center justify-center">
      <div className="flex-shrink flex-grow">
        <Image
          src={image ?? "/placeholder-image.png"}
          alt={name ?? "Team Image"}
          className="h-[200px] w-[200px] md:h-[400px] md:w-[400px] rounded-xl object-cover"
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
