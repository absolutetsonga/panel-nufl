"use client";

import { PageContainer } from "~/components/shared/ui";
import { PlayersView } from "~/components/widgets/players-view";
import { TeamView } from "~/components/widgets/team-view";

import { useGetTeam } from "~/components/shared/lib/hooks/team";

const TeamPage = (props: { teamId: string }) => {
  const team_id = Number(props.teamId);
  if (Number.isNaN(team_id)) throw new Error("Invalid team id");

  const { data: team, isLoading, isError } = useGetTeam(team_id);
  if (isLoading) return <PageContainer>Loading...</PageContainer>;
  if (isError) return <PageContainer>Error loading team.</PageContainer>;

  if (!team) throw new Error("Team not found");
  const { id, name, image, createdAt, teamPlayers } = team;

  return (
    <PageContainer justify={"normal"}>
      <div className="flex w-full flex-col justify-center gap-2 md:gap-6">
        <TeamView team={{ id, name, image, createdAt }} />
        <PlayersView team={{ teamPlayers, team_id: id }} />
      </div>
    </PageContainer>
  );
};

export default TeamPage;
