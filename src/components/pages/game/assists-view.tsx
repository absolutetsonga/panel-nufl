import { useState } from "react";
import { CreateButton } from "~/components/entities/create-button";
import { useGetAssists } from "~/components/shared/lib/hooks/assists";
import { Heading3 } from "~/components/shared/ui";

type AssistViewProps = {
  className: string;
  gameId: number;
};

export const AssistsView = ({ className, gameId }: AssistViewProps) => {
  const { data: assists, isLoading, isError } = useGetAssists(gameId);
  const [createGoalToggle, setCreateGoalToggle] = useState<boolean>(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div>
      <div className="flex flex-col">
        <div className={`flex justify-between ${className}`}>
          <CreateButton
            toggle={createGoalToggle}
            setToggle={setCreateGoalToggle}
          />
          <Heading3>Assists</Heading3>
        </div>

        {assists?.map((assist) => {
          return <div>{assist.player_id}</div>;
        })}
      </div>
    </div>
  );
};
