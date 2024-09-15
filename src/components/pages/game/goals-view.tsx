import { useState } from "react";

import { GoalCreateForm } from "~/components/widgets/forms/goals/goal-create-form";
import { CreateButton } from "~/components/entities/create-button";
import { DeleteAlert } from "~/components/entities/delete-alert/ui";
import { Heading3 } from "~/components/shared/ui";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

import { cn } from "~/components/shared/lib/utils/clsx";
import type { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/game";
import { useDeleteGoal } from "~/components/shared/lib/hooks/goals";

type GoalsViewProps = {
  game: IGameInGameweeksWithTeamPlayersAndGoals;
  teamType: "home" | "away";
};

export const GoalsView = ({ game, teamType }: GoalsViewProps) => {
  const headerClassname = cn("flex justify-between mb-4", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const titleClassname = cn("flex items-center gap-4", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const goalsClassname = cn("flex justify-end items-center gap-1", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const elementClassname = cn("flex justify-between", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });
  const playersClassname = cn("flex gap-2 text-[12px] md:text-normal", {
    "flex-row-reverse": teamType === "home",
    "flex-row": teamType === "away",
  });

  const [createGoalToggle, setCreateGoalToggle] = useState<boolean>(false);
  const [deleteGoalId, setDeleteGoalId] = useState<number | null>(null);
  const { mutate: server_deleteGoal } = useDeleteGoal();

  function getTeamGoals(teamType: "home" | "away") {
    if (teamType === "home") {
      return game.goals.filter((gm) => gm.team_id === game.home_team_id);
    }
    return game.goals.filter((gl) => gl.team_id === game.away_team_id);
  }

  function onDelete(id: number) {
    server_deleteGoal(id);
  }

  const teamGoals = getTeamGoals(teamType);
  const imageSrc =
    teamType === "home" ? game.home_team.image : game.away_team.image;

  return (
    <div className="w-full flex flex-col">
      <div className={headerClassname}>
        <CreateButton
          toggle={createGoalToggle}
          setToggle={setCreateGoalToggle}
        />
        <div className={titleClassname}>
          <Heading3>Goals</Heading3>

          <Image
            src={imageSrc ?? ""}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            alt={`Image of ${game.home_team.name}`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {teamGoals?.map((goal) => {
          return (
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
          );
        })}
      </div>

      {createGoalToggle && (
        <GoalCreateForm
          toggle={createGoalToggle}
          setToggle={setCreateGoalToggle}
          game={game}
          teamType={teamType}
        />
      )}
    </div>
  );
};
