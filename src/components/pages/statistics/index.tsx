"use client";

import {
  PageContainer,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Heading1,
} from "~/components/shared/ui";
import Image from "next/image";
import {
  useGetGoalscorers,
  useGetAssists,
  useGetCleanSheets,
  useGetYellows,
  useGetReds,
} from "~/components/shared/lib/hooks/player";

import type { IPlayerWithTeam } from "~/components/shared/lib/models/player";

const PlayerCard = ({
  player,
  rank,
  type,
}: {
  player: IPlayerWithTeam;
  rank: number;
  type: "goals" | "assists" | "clean sheets" | "yellows" | "reds";
}) => {
  const statValue =
    type === "goals"
      ? player.goals
      : type === "assists"
        ? player.assists
        : type === "clean sheets"
          ? player.clean_sheets
          : type === "yellows"
            ? player.yellow_cards
            : player.red_cards;

  return (
    <div className="flex items-center justify-between p-2 bg-card hover:bg-accent transition-colors rounded-lg">
      <div className="flex items-center space-x-3">
        <span className="text-xl font-bold text-muted-foreground w-6">
          {rank}
        </span>
        <Avatar className="h-10 w-10">
          <AvatarImage src={player.image} alt={player.fullname} />
          <AvatarFallback>
            {player.fullname
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{player.fullname}</p>
          <div className="flex items-center space-x-1">
            <Image
              src={player.team.image ?? ""}
              width={16}
              height={16}
              className="h-4 w-4 rounded-full object-cover text-xs sm:text-normal"
              alt={`Logo of ${player.team.name}`}
            />
            <p className="text-xs text-muted-foreground">{player.team.name}</p>
          </div>
        </div>
      </div>
      <span className="text-lg font-bold">{statValue}</span>
    </div>
  );
};

const PlayersTable = ({
  title,
  players,
  type,
}: {
  title: string;
  players: IPlayerWithTeam[] | undefined;
  type: "goals" | "assists" | "clean sheets" | "yellows" | "reds";
}) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      {players?.map((player, index) => (
        <PlayerCard key={index} player={player} rank={index + 1} type={type} />
      ))}
    </CardContent>
  </Card>
);

export const StatisticsPage = () => {
  const {
    data: goalscorers,
    isLoading: isGoalscorersLoading,
    isError: isGoalscorersError,
  } = useGetGoalscorers();
  const {
    data: assists,
    isLoading: isAssistsLoading,
    isError: isAssistsError,
  } = useGetAssists();
  const {
    data: cleanSheets,
    isLoading: isCleanSheetsLoading,
    isError: isCleanSheetsError,
  } = useGetCleanSheets();
  const {
    data: yellows,
    isLoading: isYellowsLoading,
    isError: isYellowsError,
  } = useGetYellows();
  const {
    data: reds,
    isLoading: isRedsLoading,
    isError: isRedsError,
  } = useGetReds();

  return (
    <PageContainer justify="normal">
      <div className="container mx-auto py-10 space-y-8">
        <Heading1>Statistics</Heading1>

        <div className="grid grid-cols-1 gap-8">
          <PlayersTable
            title="Most Goals"
            players={goalscorers}
            type={"goals"}
          />
          <PlayersTable
            title="Most Assists"
            players={assists}
            type={"assists"}
          />
          <PlayersTable
            title="Most Clean Sheets"
            players={cleanSheets}
            type={"clean sheets"}
          />
          <PlayersTable
            title="Most Yellow Cards"
            players={yellows}
            type={"yellows"}
          />
          <PlayersTable title="Most Red Cards" players={reds} type={"reds"} />
        </div>
      </div>
    </PageContainer>
  );
};
