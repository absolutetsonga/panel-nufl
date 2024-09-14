import { useState } from "react";
import { useGetGoals } from "~/components/shared/lib/hooks/goals";

import { GoalCreateForm } from "~/components/widgets/forms/goals/goal-create-form";
import { CreateButton } from "~/components/entities/create-button";
import { Heading3 } from "~/components/shared/ui";

import type { IGameInGameweeksWithTeamPlayers } from "~/components/shared/lib/models/games";

type GoalsViewProps = {
  className: string;
  game: IGameInGameweeksWithTeamPlayers;
  teamType: "home" | "away";
};

export const GoalsView = ({ className, game, teamType }: GoalsViewProps) => {
  const { data: goals, isLoading, isError } = useGetGoals(game.id);
  const [createGoalToggle, setCreateGoalToggle] = useState<boolean>(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="flex flex-col">
      <div className={`flex justify-between ${className}`}>
        <CreateButton
          toggle={createGoalToggle}
          setToggle={setCreateGoalToggle}
        />
        <Heading3>Goals</Heading3>
      </div>

      {goals?.map((goal) => {
        return <div>{goal.player_id}</div>;
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
