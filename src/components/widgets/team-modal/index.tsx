"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  useDeleteTeam,
  useGetTeam,
  useUpdateTeam,
} from "~/components/shared/lib/hooks/team";
import { PencilIcon, Trash2Icon, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";
import { DeleteAlert } from "~/components/entities/delete-alert/ui";

export const TeamModalView = (props: { teamId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteAlertToggle, setDeleteAlertToggle] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const team_id = Number(props.teamId);

  const { mutate: server_deleteTeam } = useDeleteTeam();
  const { mutate: server_updateTeam } = useUpdateTeam();
  const router = useRouter();

  if (Number.isNaN(team_id)) throw new Error("Invalid team id");
  const { data: team, isLoading, isError } = useGetTeam(team_id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading team.</div>;
  if (!team) throw new Error("Team not found");
  if (!team.user_id) throw new Error("Unauthorized");

  const onDelete = (team_id: number) => {
    server_deleteTeam({ id: team_id });
    router.push("/teams");
  };

  const onUpdate = () => {
    server_updateTeam(
      { id: team.id, name: name, image: image },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex-shrink flex-grow">
        <Image
          src={team.image ?? "/placeholder-image.png"}
          alt={team.name ?? "Team Image"}
          className="object-contain"
          width={400}
          height={400}
        />
      </div>
      <div className="flex w-full flex-row">
        <div className="flex h-full w-1/5 flex-col items-center justify-between gap-4 px-4 py-2">
          {isEditing ? (
            <CheckIcon className="h-6 w-6 cursor-pointer" onClick={onUpdate} />
          ) : (
            <PencilIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          )}
          <Trash2Icon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setDeleteAlertToggle(true)}
          />
        </div>

        <div className="flex h-full w-4/5 flex-1 flex-shrink-0 flex-col border-l">
          {isEditing ? (
            <div className="flex flex-col p-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={team.name ?? "Enter team name"}
                className="rounded border p-2"
              />
              <UploadButton
                endpoint="teamImage"
                onClientUploadComplete={(res) => {
                  setImage(res[0]?.url ?? "");
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          ) : (
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
      {deleteAlertToggle && (
        <DeleteAlert
          trigger="Delete"
          title={`Delete ${team.name} Team`}
          description="Are you sure? This action cannot be undone. This will permanently delete this team and remove all games, scores, players, their goals, assists, clean sheets data with this team from our servers. In special cases we recommend to contact with developer to delete the team."
          onConfirm={() => onDelete(team.id)}
          onCancel={() => setDeleteAlertToggle(false)}
        />
      )}
    </div>
  );
};
