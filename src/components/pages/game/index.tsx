"use client";
import { useGetGame } from "~/components/shared/lib/hooks/games";

import { GameHeader } from "./game-header";
import { GoalsView } from "./goals-view";
import { AssistsView } from "./assists-view";
import { CardsView } from "./cards-view";
import { PageContainer } from "~/components/shared/ui";

export const GamePage = ({ id }: { id: string }) => {
  const gameId = Number(id);
  const { data: game, isLoading, isError } = useGetGame(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!game) return <div>Game not found</div>;

  return (
    <PageContainer justify="start">
      <GameHeader game={game} />

      <div className="w-full flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-4 w-full justify-center text-right">
          <GoalsView gameId={gameId} className="flex-row" />
          <AssistsView gameId={gameId} className="flex-row" />
          <CardsView gameId={gameId} className="flex-row" />
        </div>
        <div className="flex flex-col gap-4 w-full justify-center text-left">
          <GoalsView gameId={gameId} className="flex-row-reverse" />
          <AssistsView gameId={gameId} className="flex-row-reverse" />
          <CardsView gameId={gameId} className="flex-row-reverse" />
        </div>
      </div>
    </PageContainer>
  );
};

// GameHeader
// GoalsView (get all goals on this game, add goal, change goal information, delete goal)
// when adding goal it should be possible to add assist
// AssistsView ()
// CardsView (get all cards, add card (yellow, red), remove card)
// Save button when clicked should save all changes
