import { useState } from "react";
import { CreateButton } from "~/components/entities/create-button";
import { useGetGoals } from "~/components/shared/lib/hooks/goals";
import { Heading3 } from "~/components/shared/ui";

type GoalsViewProps = {
  className: string;
  gameId: number;
};

export const GoalsView = ({ className, gameId }: GoalsViewProps) => {
  const { data: goals, isLoading, isError } = useGetGoals(gameId);
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
    </div>
  );
};
