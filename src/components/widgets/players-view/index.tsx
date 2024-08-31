"use client";

import { useState } from "react";

import { PlayerCreateForm } from "../forms/player-create-form";
import { CreateButton } from "~/components/entities/create-button";

import type { ITeamPlayer } from "~/components/shared/lib/models/team";
import { Heading3 } from "~/components/shared/ui/typography";
import Image from "next/image";

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
      {!createPlayerToggle && <CreateButton
        toggle={createPlayerToggle}
        setToggle={setCreatePlayerToggle}
      />}

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
    <div className="grid grid-cols-1 items-center justify-center gap-4 lg:grid-cols-4">
      {team_players?.map((player) => (
        <div key={player.id}>
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-gray-400 p-4">
            <Image
              src={player.image ?? "/placeholder-image.png"}
              alt={player.fullname ?? "Player Image"}
              width={196}
              height={196}
              className="h-[120px] w-[120px] rounded-xl object-cover md:h-[196px] md:w-[196px]"
            />
            <h1>{player.fullname}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};
