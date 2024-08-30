import { getTeams } from "~/server/db/queries/team";
import {PageContainer} from "~/components/shared/ui";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const teams = await getTeams();

  return (
    <PageContainer>
      {teams.map((team) => {
        return <div key={team.id}> {team.name} </div>;
      })}
    </PageContainer>
  );
}
