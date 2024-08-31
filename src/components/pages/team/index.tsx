"use client";

import { PageContainer } from "~/components/shared/ui";
import { PlayersView } from "~/components/widgets/players-view";
import { TeamView } from "~/components/widgets/team-view";

import { useGetTeam } from "~/components/shared/lib/hooks/team";

const TeamPage = (props: { teamId: string }) => {
  const team_id = Number(props.teamId);
  if (Number.isNaN(team_id)) throw new Error("Invalid team id");

  const { data: team, isLoading, isError } = useGetTeam(team_id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading team.</div>;
  if (!team) throw new Error("Team not found");
  const { id, name, image, createdAt } = team;

  return (
    <PageContainer>
      <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row">
        <TeamView team={{ id, name, image, createdAt }} />
        <PlayersView team_players={team.team_players} />
      </div>
    </PageContainer>
  );
};

export default TeamPage;