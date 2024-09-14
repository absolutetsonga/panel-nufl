import { useState } from "react";
import { useGetGoals } from "~/components/shared/lib/hooks/goals";

import { GoalCreateForm } from "~/components/widgets/forms/goals/goal-create-form";
import { CreateButton } from "~/components/entities/create-button";
import { Heading3 } from "~/components/shared/ui";
import Image from "next/image";

import type { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/games";
import { cn } from "~/components/shared/lib/utils/clsx";

type GoalsViewProps = {
  game: IGameInGameweeksWithTeamPlayersAndGoals;
  teamType: "home" | "away";
};

export const GoalsView = ({ game, teamType }: GoalsViewProps) => {
  const titleClassname = cn("flex justify-between", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const goalsClassname = cn("flex justify-end items-center gap-2", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const [createGoalToggle, setCreateGoalToggle] = useState<boolean>(false);

  function getTeamGoals(teamType: "home" | "away") {
    if (teamType === "home") {
      return game.goals.filter((gm) => gm.team_id === game.home_team_id);
    }
    return game.goals.filter((gl) => gl.team_id === game.away_team_id);
  }

  const teamGoals = getTeamGoals(teamType);

  return (
    <div className="flex flex-col">
      <div className={titleClassname}>
        <CreateButton
          toggle={createGoalToggle}
          setToggle={setCreateGoalToggle}
        />
        <Heading3>Goals</Heading3>
      </div>

      {teamGoals?.map((goal) => {
        return (
          <div key={goal.id} className={goalsClassname}>
            <p>{goal.player.fullname}</p>
            <Image
              width={20}
              height={20}
              className="object-cover rounded-full"
              alt={goal.player.fullname}
              src={goal.player.image}
            />
          </div>
        );
      })}

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
