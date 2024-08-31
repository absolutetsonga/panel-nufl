"use client";

import { useState } from "react";

import { PlayerCreateForm } from "../forms/player-create-form";
import { CreateButton } from "~/components/entities/create-button";
import { Heading3, Paragraph } from "~/components/shared/ui/typography";
import Image from "next/image";
import Link from "next/link";
import type { ITeamPlayer } from "~/components/shared/lib/models/team";

type PlayersViewProps = {
  team: {
    team_players: ITeamPlayer[];
    team_id: number;
  };
};

export const PlayersView = ({ team }: PlayersViewProps) => {
  const { team_players, team_id } = team;
  const [createPlayerToggle, setCreatePlayerToggle] = useState(false);

  return (
    <div className="flex flex-col">
      {!createPlayerToggle && (
        <div className="absolute right-2 top-2 flex flex-row items-center justify-center p-1 text-gray-500 hover:text-gray-700">
          <Paragraph>Add new player</Paragraph>
          <CreateButton
            toggle={createPlayerToggle}
            setToggle={setCreatePlayerToggle}
          />
        </div>
      )}

      {!createPlayerToggle && (
        <div className="flex flex-col gap-4 p-4">
          <Heading3>Players</Heading3>
          <PopulatePlayers team_players={team_players} />
        </div>
      )}

      <PlayerCreateForm
        team_id={team_id}
        toggle={createPlayerToggle}
        setToggle={setCreatePlayerToggle}
      />
    </div>
  );
};

const PopulatePlayers = ({ team_players }: { team_players: ITeamPlayer[] }) => {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-4 lg:grid-cols-3">
      {team_players?.map((player) => (
        <div key={player.id}>
          <Link href={`/players/${player.id}`}>
            <div className="flex flex-row items-center justify-center gap-4 rounded-xl border-2 border-gray-400 p-2">
              <Image
                src={player.image ?? "/placeholder-image.png"}
                alt={player.fullname ?? "Player Image"}
                width={96}
                height={96}
                className="h-[64px] w-[64px] rounded-full object-cover md:h-[96px] md:w-[96px]"
              />

              <div className="flex flex-col justify-center gap-2">
                <h3>{player.fullname}</h3>
                <p>Pos: {player.position}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
