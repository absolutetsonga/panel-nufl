"use client";

import { useState } from "react";
import { useGetAllGameweeks } from "~/components/shared/lib/hooks/gameweeks";

import { GameCreateForm } from "~/components/widgets/forms/games/game-create-form";
import { GameweekCreateForm } from "~/components/widgets/forms/gameweeks/gameweek-create-form";
import { CreateButton } from "~/components/entities/create-button";
import { PageContainer } from "~/components/shared/ui";
import {
  Heading1,
  Heading3,
  Paragraph,
} from "~/components/shared/ui/typography";
import Image from "next/image";

import type { IGameInGameweeks } from "~/components/shared/lib/models/games";

function extractUppercase(text: string): string {
  return text
    .split(" ")
    .filter((word) => /^[A-Z]/.test(word))
    .map((word) => word[0])
    .join("");
}

export const GamesPage = () => {
  const [createGameweekToggle, setCreateGameweekToggle] = useState(false);

  return (
    <PageContainer justify="normal">
      <div className="relative flex w-full flex-col gap-4 p-0 md:p-4">
        <Heading1>Games</Heading1>
        {!createGameweekToggle && <PopulateGameweeks />}
        <CreateButton
          toggle={createGameweekToggle}
          setToggle={setCreateGameweekToggle}
          className="absolute right-0"
        />
      </div>

      {createGameweekToggle && (
        <GameweekCreateForm
          toggle={createGameweekToggle}
          setToggle={setCreateGameweekToggle}
        />
      )}
    </PageContainer>
  );
};

export const PopulateGameweeks = () => {
  const { data: gameweeks, isLoading, isError } = useGetAllGameweeks();

  if (isLoading) return <Paragraph>Loading...</Paragraph>;
  if (isError) return <Paragraph>Error loading games.</Paragraph>;

  if (gameweeks?.length === 0) return <Paragraph>No gameweeks.</Paragraph>;
  console.log(gameweeks);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {gameweeks?.map((gameweek) => (
        <div key={gameweek.id} className="flex flex-col gap-4">
          <Heading3>Gameweek {gameweek.number}</Heading3>

          <PopulateGames
            games={gameweek.games}
            gameweek_number={gameweek.number}
          />
        </div>
      ))}
    </div>
  );
};

const PopulateGames = ({
  games,
  gameweek_number,
}: {
  games: IGameInGameweeks[];
  gameweek_number: number;
}) => {
  const [createGameToggle, setCreateGameToggle] = useState(false);

  return (
    <>
      <CreateButton
        toggle={createGameToggle}
        setToggle={setCreateGameToggle}
        className="absolute right-0"
      />

      {createGameToggle ? (
        <GameCreateForm
          gameweek_number={gameweek_number}
          toggle={createGameToggle}
          setToggle={setCreateGameToggle}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex w-full flex-row items-center justify-center gap-4 rounded-xl bg-[#E8BF77] p-2 font-bold text-black shadow-md"
            >
              <div className="flex flex-row items-center justify-center gap-4 text-right">
                <p className="text-[14px]">
                  {extractUppercase("School of Mining and Geosciences")}
                </p>
                <Image
                  src={game.home_team.image ?? ""}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                  alt={`Image of ${game.home_team.name}`}
                />
              </div>
              <Heading3>VS</Heading3>
              <div className="flex flex-row items-center justify-center gap-4 text-left">
                <Image
                  src={game.away_team.image ?? ""}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                  alt={`Image of ${game.away_team.name}`}
                />
                <p className="text-[14px]">
                  {extractUppercase("Social Sciences and Humanities")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
