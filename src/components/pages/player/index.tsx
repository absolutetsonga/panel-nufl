"use client";

import { useState } from "react";
import { useGetPlayer } from "~/components/shared/lib/hooks/player";
import { Button, PageContainer } from "~/components/shared/ui";
import { PlayerUpdateForm } from "~/components/widgets/forms/player-update-form";
import Image from "next/image";

const placeholder_image =
  "https://utfs.io/f/aeb9ab9b-7970-4eed-8fc1-92ac644c1165-clf4u5.jpg";

type ITeamPlayer = {
  id: number;
  fullname: string;
  image: string | null;
  position:
    | "Goalkeeper"
    | "Defender"
    | "Left Winger"
    | "Right Winger"
    | "Striker"
    | undefined;
  major: string;
  age: number;
  played_matches: number;
  goals: number;
  assists: number;
  clean_sheets: number;
  yellow_cards: number;
  red_cards: number;
};

export const PlayerPage = ({ playerId }: { playerId: string }) => {
  const player_id = Number(playerId);
  if (Number.isNaN(player_id)) throw new Error("Invalid player id");

  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);
  const { data: player, isLoading, isError } = useGetPlayer(player_id);

  if (isLoading) return <PageContainer>Loading...</PageContainer>;
  if (isError) return <PageContainer>Error loading player.</PageContainer>;
  if (!player) throw new Error("Player not found");

  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <PlayerView player={player} />

        <div className="grid max-w-3xl grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => setEditToggle(true)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Player
            </Button>
            <Button
              onClick={() => setDeleteToggle(true)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete Player
            </Button>
          </div>
        </div>
      </div>
      {editToggle && (
        <PlayerUpdateForm
          toggle={editToggle}
          setToggle={setEditToggle}
          player={player}
        />
      )}
    </PageContainer>
  );
};

export const PlayerView = (player: ITeamPlayer) => {
  console.log(player);
  const {
    fullname,
    image,
    position,
    major,
    age,
    played_matches,
    goals,
    assists,
    clean_sheets,
    yellow_cards,
    red_cards,
  } = player;

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={image ?? placeholder_image}
          alt={`Image of ${fullname}`}
          width={96}
          height={96}
          className="rounded-full border-4 border-indigo-500 object-cover shadow-md"
        />
        <h1 className="text-2xl font-semibold text-gray-800">{fullname}</h1>
        <p className="text-lg text-gray-600">{position}</p>
      </div>
      <div className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold text-indigo-600">Details</h2>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Major:</strong>{" "}
          {major}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Age:</strong> {age}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">
            Played Matches:
          </strong>{" "}
          {played_matches}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Goals:</strong>{" "}
          {goals}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Assists:</strong>{" "}
          {assists}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Clean Sheets:</strong>{" "}
          {clean_sheets}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Yellow Cards:</strong>{" "}
          {yellow_cards}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Red Cards:</strong>{" "}
          {red_cards}
        </p>
      </div>
    </div>
  );
};
