"use client";
import { useGetGame } from "~/components/shared/lib/hooks/games";

import { GameHeader } from "./game-header";
import { GoalsView } from "./goals-view";
import { AssistsView } from "./assists-view";
import { CardsView } from "./cards-view";
import { PageContainer } from "~/components/shared/ui";
import Image from "next/image";

export const GamePage = ({ id }: { id: string }) => {
  const gameId = Number(id);
  const { data: game, isLoading, isError } = useGetGame(gameId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!game) return <div>Game not found</div>;

  return (
    <PageContainer justify="start">
      <GameHeader game={game} />

      <div className="w-full flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-4 w-full justify-center text-right">
          <div className="flex flex-row items-center justify-end gap-4 text-right">
            <p className="text-[18px]">{game.home_team.name}</p>
            <Image
              src={game.home_team.image ?? ""}
              width={60}
              height={60}
              className="h-[60px] w-[60px] rounded-full object-cover"
              alt={`Image of ${game.home_team.name}`}
            />
          </div>
          <GoalsView game={game} teamType={"home"} />
          <AssistsView gameId={gameId} className="flex-row" />
          <CardsView gameId={gameId} className="flex-row" />
        </div>
        <div className="flex flex-col gap-4 w-full justify-center text-left">
          <div className="flex flex-row items-center justify-start gap-4 text-right">
            <Image
              src={game.away_team.image ?? ""}
              width={60}
              height={60}
              className="h-[60px] w-[60px] rounded-full object-cover"
              alt={`Image of ${game.home_team.name}`}
            />
            <p className="text-[18px]">{game.away_team.name}</p>
          </div>
          <GoalsView game={game} teamType={"away"} />
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
