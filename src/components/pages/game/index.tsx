"use client";
import { useGetGame } from "~/components/shared/lib/hooks/games";

import { GameHeader } from "./game-header";
import { GoalsView } from "./goals-view";
import { CardsView } from "./cards-view";
import { PageContainer } from "~/components/shared/ui";

export const GamePage = ({ id }: { id: string }) => {
  const gameId = Number(id);
  const { data: game, isLoading, isError } = useGetGame(gameId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!game) return <div>Game not found</div>;

  return (
    <PageContainer justify="start">
      <GameHeader game={game} />

      <div className="w-full flex flex-col justify-between gap-4">
        <div className="p-4 w-full flex flex-col lg:flex-row justify-center gap-6 rounded-lg">
          <GoalsView game={game} teamType={"home"} />
          <GoalsView game={game} teamType={"away"} />
        </div>
        <div className="p-4 w-full flex flex-col lg:flex-row justify-center gap-6 rounded-lg">
          <CardsView game={game} teamType={"home"} />
          <CardsView game={game} teamType={"away"} />
        </div>
      </div>
    </PageContainer>
  );
};
