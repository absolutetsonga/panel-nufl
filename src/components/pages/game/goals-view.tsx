import { useState } from "react";
import { useDeleteGoal } from "~/components/shared/lib/hooks/goals";

import { GoalCreateForm } from "~/components/widgets/forms/goals/goal-create-form";
import { PopulateGoals } from "./populate-goals";
import { CreateButton } from "~/components/entities/create-button";
import { Heading3 } from "~/components/shared/ui";
import Image from "next/image";

import { cn } from "~/components/shared/lib/utils/clsx";

import type { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/game";

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
    // server_deleteGoal(id);
    console.log(id);
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

      <PopulateGoals
        teamType={teamType}
        deleteGoalId={deleteGoalId}
        setDeleteGoalId={setDeleteGoalId}
        teamGoals={teamGoals}
        onDelete={onDelete}
      />

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
