import { DeleteAlert } from "~/components/entities/delete-alert/ui";
import { cn } from "~/components/shared/lib/utils/clsx";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

import type { ITeamPlayer } from "~/components/shared/lib/models/player";
import type { Dispatch, SetStateAction } from "react";

export const PopulateGoals = ({
  teamType,
  deleteGoalId,
  setDeleteGoalId,
  teamGoals,
  onDelete,
}: {
  teamType: "home" | "away";
  deleteGoalId: number | null;
  setDeleteGoalId: Dispatch<SetStateAction<number | null>>;
  teamGoals: {
    id: number;
    user_id: string;
    game_id: number;
    team_id: number;
    player_id: number;
    is_own_goal: boolean;
    player: ITeamPlayer;
    assist: {
      id: number;
      user_id: string;
      game_id: number;
      player_id: number;
      team_id: number;
      goal_id: number;
      createdAt: Date;
      updatedAt: Date;
      player: ITeamPlayer;
    };
  }[];
  onDelete: (deleteGoalId: number) => void;
}) => {
  const goalsClassname = cn("flex justify-end items-center gap-1", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const elementClassname = cn("flex justify-between", {
    "flex-row pl-4": teamType === "home",
    "flex-row-reverse pr-4": teamType === "away",
  });
  const playersClassname = cn("flex gap-2 text-[12px] md:text-normal", {
    "flex-row-reverse": teamType === "home",
    "flex-row": teamType === "away",
  });

  return (
    <div className="flex flex-col gap-1">
      {teamGoals?.map((goal) => (
        <div key={goal.id} className={elementClassname}>
          <Trash2Icon
            className=" h-4 w-4 cursor-pointer"
            onClick={() => setDeleteGoalId(goal.id)}
          />

          <div className={goalsClassname}>
            <div className={playersClassname}>
              {goal.is_own_goal && <p>(OG)</p>}
              <p>{goal.player.fullname}</p>
              {goal.assist && <p>{`(${goal.assist.player.fullname})`}</p>}
            </div>

            <Image
              width={20}
              height={20}
              className="object-cover rounded-full"
              alt={goal.player.fullname}
              src={goal.player.image}
            />

            {deleteGoalId === goal.id && (
              <DeleteAlert
                trigger="Delete?"
                title={`Delete Gameweek`}
                description="Are you sure? This action cannot be undone. This will permanently delete this team and remove all games, scores, players, their goals, assists, clean sheets data with this team from our servers. In special cases we recommend to contact with developer to delete the team."
                onConfirm={() => {
                  onDelete(deleteGoalId);
                  setDeleteGoalId(null);
                }}
                onCancel={() => setDeleteGoalId(null)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
