import { useState } from "react";

import { GoalCreateForm } from "~/components/widgets/forms/goals/goal-create-form";
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

  const goalsClassname = cn("flex justify-end items-center gap-2", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const playersClassname = cn("flex gap-2 text-[12px] md:text-normal", {
    "flex-row-reverse": teamType === "home",
    "flex-row": teamType === "away",
  });

  const [createGoalToggle, setCreateGoalToggle] = useState<boolean>(false);

  function getTeamGoals(teamType: "home" | "away") {
    if (teamType === "home") {
      return game.goals.filter((gm) => gm.team_id === game.home_team_id);
    }
    return game.goals.filter((gl) => gl.team_id === game.away_team_id);
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
            <div key={goal.id} className={goalsClassname}>
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
