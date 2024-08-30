"use client";

import { PageContainer } from "~/components/shared/ui";
import { TeamForm } from "~/components/widgets/forms/team-form";
import { useGetTeams } from "~/components/shared/lib/hooks/team";
import Image from "next/image";

export const TeamsPage = () => {
  const { data: teams } = useGetTeams();
  console.log(teams);
  return (
    <PageContainer>
      {teams?.map((team) => {
        return (
          <div key={team.id}>
            <h1>{team.name}</h1>
            <Image
              src={team.image ?? ""}
              alt={team.name ?? ""}
              width={196}
              height={196}
            />
          </div>
        );
      })}
      <TeamForm />
    </PageContainer>
  );
};
