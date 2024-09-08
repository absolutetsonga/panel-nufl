"use client";

import { useState } from "react";
import { useGetAllGames } from "~/components/shared/lib/hooks/games";

import { GameCreateForm } from "~/components/widgets/forms/games/game-create-form";
import { CreateButton } from "~/components/entities/create-button";
import { PageContainer } from "~/components/shared/ui";
import {
  Heading1,
  Heading3,
  Paragraph,
} from "~/components/shared/ui/typography";
import Image from "next/image";

function extractUppercase(text: string): string {
  return text
    .split(" ")
    .filter((word) => /^[A-Z]/.test(word))
    .map((word) => word[0])
    .join("");
}

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
    <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {games?.map((game) => (
        <div
          key={game.id}
          className="flex w-full flex-row items-center justify-center gap-4 rounded-xl bg-[#E8BF77] p-2 text-black shadow-md font-bold"
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
  );
};
