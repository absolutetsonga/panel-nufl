import { useState } from "react";
import { useGetCards } from "~/components/shared/lib/hooks/cards";

import { CreateButton } from "~/components/entities/create-button";
import { Heading3 } from "~/components/shared/ui";

type CardViewProps = {
  className: string;
  gameId: number;
};

export const CardsView = ({ className, gameId }: CardViewProps) => {
  const { data: cards, isLoading, isError } = useGetCards(gameId);
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
          <Heading3>Cards</Heading3>
        </div>

        {cards?.map((card) => {
          return <div key={card.id}>{card.player_id}</div>;
        })}
      </div>
    </div>
  );
};
