import { getTeams } from "~/server/db/queries/team";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const teams = await getTeams();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {teams.map((team) => {
        return <div key={team.id}> {team.name} </div>;
      })}
    </main>
  );
}
