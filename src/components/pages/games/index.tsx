"use client";

import { useState } from "react";
import {
  useDeleteGameweek,
  useGetAllGameweeks,
} from "~/components/shared/lib/hooks/gameweeks";

import { GameCreateForm } from "~/components/widgets/forms/games/game-create-form";
import { GameweekCreateForm } from "~/components/widgets/forms/gameweeks/gameweek-create-form";
import { GamesPageSkeleton } from "~/components/entities/skeletons/gameweek-skeleton";
import { DeleteAlert } from "~/components/entities/delete-alert/ui";
import { CreateButton } from "~/components/entities/create-button";
import {
  PageContainer,
  Heading1,
  Heading3,
  Paragraph,
} from "~/components/shared/ui";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { IGameInGameweeks } from "~/components/shared/lib/models/games";

export const GamesPage = () => {
  const [createGameweekToggle, setCreateGameweekToggle] = useState(false);

  return (
    <PageContainer justify="normal">
      <div className="flex w-full flex-col gap-4 p-0 md:p-4">
        <div className="flex flex-row justify-between items-center">
          <Heading1>Games</Heading1>
          <CreateButton
            toggle={createGameweekToggle}
            setToggle={setCreateGameweekToggle}
          />
        </div>
        <PopulateGameweeks toggle={createGameweekToggle} />
      </div>

      <GameweekCreateForm
        toggle={createGameweekToggle}
        setToggle={setCreateGameweekToggle}
      />
    </PageContainer>
  );
};

export const PopulateGameweeks = ({ toggle }: { toggle: boolean }) => {
  const [deleteGameweekId, setDeleteGameweekId] = useState<number | null>(null);
  const { data: gameweeks, isLoading, isError } = useGetAllGameweeks();
  const { mutate: server_deleteGameweek } = useDeleteGameweek();

  if (isLoading) return <GamesPageSkeleton />;
  if (isError) return <Paragraph>Error loading games.</Paragraph>;
  if (gameweeks?.length === 0) return <Paragraph>No gameweeks.</Paragraph>;

  if (toggle) return <></>;

  const onDelete = (id: number) => {
    server_deleteGameweek(id);
    setDeleteGameweekId(null);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {gameweeks?.map((gameweek) => (
        <div key={gameweek.id} className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <Heading3>Gameweek {gameweek.number}</Heading3>

            <div className="left-40 top-0 gap-6 p-2">
              <div className="flex flex-row gap-4">
                <Trash2Icon
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setDeleteGameweekId(gameweek.id)}
                />
              </div>
            </div>
          </div>

          {deleteGameweekId === gameweek.id && (
            <DeleteAlert
              trigger="Delete?"
              title={`Delete Gameweek`}
              description="Are you sure? This action cannot be undone. This will permanently delete this team and remove all games, scores, players, their goals, assists, clean sheets data with this team from our servers. In special cases we recommend to contact with developer to delete the team."
              onConfirm={() => {
                onDelete(deleteGameweekId);
                setDeleteGameweekId(null);
              }}
              onCancel={() => setDeleteGameweekId(null)}
            />
          )}
          <PopulateGames games={gameweek.games} gameweek_id={gameweek.id} />
        </div>
      ))}
    </div>
  );
};

const PopulateGames = ({
  games,
  gameweek_id,
}: {
  games: IGameInGameweeks[];
  gameweek_id: number;
}) => {
  const [createGameToggle, setCreateGameToggle] = useState(false);
  return (
    <div>
      <CreateButton toggle={createGameToggle} setToggle={setCreateGameToggle} />

      {createGameToggle ? (
        <GameCreateForm
          gameweek_id={gameweek_id}
          toggle={createGameToggle}
          setToggle={setCreateGameToggle}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 ">
          {games.map((game) => (
            <Link href={`games/${game.id}`} key={game.id}>
              <div className="flex w-full flex-row items-center justify-center gap-4 rounded-xl bg-[#E8BF77] p-2 font-bold text-black shadow-md">
                <div className="flex flex-row items-center justify-center gap-4 text-right">
                  <p className="text-[14px]">{game.home_team.name}</p>
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
                  <p className="text-[14px]">{game.away_team.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
