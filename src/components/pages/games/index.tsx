"use client";

import { useState } from "react";
import { useGetAllGames } from "~/components/shared/lib/hooks/games";

import { GameCreateForm } from "~/components/widgets/forms/games/game-create-form";
import { CreateButton } from "~/components/entities/create-button";
import { PageContainer } from "~/components/shared/ui";
import { Heading1, Heading3, Paragraph } from "~/components/shared/ui/typography";
import Image from "next/image";

export const GamesPage = () => {
  const [createGameToggle, setCreateGameToggle] = useState(false);

  return (
    <PageContainer justify="normal">
      <div className="relative flex w-full flex-col gap-4 p-4">
        <Heading1>Games</Heading1>
        {!createGameToggle && <PopulateGames />}
        <CreateButton
          toggle={createGameToggle}
          setToggle={setCreateGameToggle}
          className="absolute right-0"
        />
      </div>

      {createGameToggle && (
        <GameCreateForm
          toggle={createGameToggle}
          setToggle={setCreateGameToggle}
        />
      )}
    </PageContainer>
  );
};

export const PopulateGames = () => {
  const { data: games, isLoading, isError } = useGetAllGames();
  console.log(games);
  if (isLoading) return <Paragraph>Loading...</Paragraph>;
  if (isError) return <Paragraph>Error loading games.</Paragraph>;
  if (games?.length === 0) return <Paragraph>No games found.</Paragraph>;

  return (
    <div>
      {games?.map((game) => (
        <div key={game.id} className="flex flex-row gap-4 p-4">
          <div className="flex flex-row items-center justify-center">
          <Image src={game.home_team.image ?? ""} width={32} height={32} alt={`Image of ${game.home_team.name}`} />
          <Paragraph>
            {game.home_team.name}
          </Paragraph>
          </div>
          <Heading3>VS</Heading3>
          <div className="flex flex-row items-center justify-center">
          <Image src={game.away_team.image ?? ""} width={32} height={32} alt={`Image of ${game.away_team.name}`} />
          <Paragraph>
            {game.away_team.name}
          </Paragraph>
          </div>
        </div>
      ))}
    </div>
  );
};
