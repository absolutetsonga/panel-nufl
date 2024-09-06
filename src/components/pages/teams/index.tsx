"use client";

import { useState } from "react";
import { useGetTeams } from "~/components/shared/lib/hooks/team";

import { PageContainer } from "~/components/shared/ui";
import { TeamCreateForm } from "~/components/widgets/forms/team/team-create-form";
import { CreateButton } from "~/components/entities/create-button";
import { Heading1, Paragraph } from "~/components/shared/ui/typography";
import Image from "next/image";
import Link from "next/link";

export const TeamsPage = () => {
  const [createTeamToggle, setCreateTeamToggle] = useState(false);

  return (
    <PageContainer justify="normal">
      <div className="relative flex w-full flex-col gap-4 p-4">
        <Heading1>Teams</Heading1>
        {!createTeamToggle && <PopulateTeams />}
        <CreateButton
          toggle={createTeamToggle}
          setToggle={setCreateTeamToggle}
          className="absolute right-0"
        />
        {createTeamToggle && (
          <TeamCreateForm
            toggle={createTeamToggle}
            setToggle={setCreateTeamToggle}
          />
        )}
      </div>
    </PageContainer>
  );
};

const PopulateTeams = () => {
  const { data: teams, isLoading, isError } = useGetTeams();

  if (isLoading) return <Paragraph>Loading...</Paragraph>;
  if (isError) return <Paragraph>Error loading teams.</Paragraph>;
  if (teams?.length === 0) return <Paragraph>No teams found.</Paragraph>;

  return (
    <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {teams?.map((team) => (
        <Link
          href={`/?modal=teams/${team.id}`}
          as={`/teams/${team.id}`}
          key={team.id}
        >
          <div className="flex w-full flex-row items-center justify-between rounded-xl border-[1px] border-slate-400 pl-4 shadow-lg transition-all hover:scale-105">
            <h1>{team.name}</h1>
            <Image
              src={team.image ?? "/placeholder-image.png"}
              alt={team.name ?? "Team Image"}
              width={196}
              height={196}
              className="h-[40px] w-[40px] rounded-xl object-cover md:h-[92px] md:w-[92px]"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
