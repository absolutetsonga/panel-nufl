import React from "react";
import { getTeam } from "~/server/db/queries/team";
import { Button } from "~/components/shared/ui";
import Image from "next/image";

export const TeamModalView = async (props: { teamId: string }) => {
  const team_id = Number(props.teamId);

  if (Number.isNaN(team_id)) throw new Error("Invalid team id");
  const team = await getTeam(team_id);
  if (!team) throw new Error("Team not found");
  if (!team.user_id) throw new Error("Unauthorized");

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
      <div className="flex h-full w-56 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-xl">{team.name}</div>

        <div className="p-2">
          <div>Uploaded By:</div>
          {/* <div>{userInfo.fullName}</div>/ */}
        </div>

        <div className="p-2">
          <div>Created On:</div>
          <div>{team.createdAt.toLocaleDateString()}</div>
        </div>

        <div className="p-2">
          <form>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
