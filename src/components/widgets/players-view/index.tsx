"use client";

import type { ITeamPlayer } from "~/components/shared/lib/models/team";

type Props = { team_players: ITeamPlayer[] };
export const PlayersView = ({ team_players }: Props) => {
  if (!team_players.length) return <div>No players found</div>;
  return <div>PlayersView</div>;
};
