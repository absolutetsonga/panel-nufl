"use client";

import { useState } from "react";
import { useGetTeams } from "~/components/shared/lib/hooks/team";

import { PageContainer } from "~/components/shared/ui";
import { TeamForm } from "~/components/widgets/forms/team-form";
import { Button } from "~/components/shared/ui";
import { Heading1, Paragraph } from "~/components/shared/ui/typography";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const TeamsPage = () => {
  const [createTeamToggle, setCreateTeamToggle] = useState(false);

  return (
    <PageContainer>
      <CreateTeamButton
        toggle={createTeamToggle}
        setToggle={setCreateTeamToggle}
      />

      <div className="flex flex-col gap-4 p-4">
        <Heading1>Teams</Heading1>
        <PopulateTeams />
      </div>

      <TeamForm toggle={createTeamToggle} setToggle={setCreateTeamToggle} />
    </PageContainer>
  );
};

const PopulateTeams = () => {
  const { data: teams, isLoading, isError } = useGetTeams();

  if (isLoading) return <Paragraph>Loading...</Paragraph>;
  if (isError) return <Paragraph>Error loading teams.</Paragraph>;
  if (teams?.length === 0) return <Paragraph>No teams found.</Paragraph>;

  return (
    <div className="grid grid-cols-3 items-center justify-center gap-4">
      {teams?.map((team) => (
        <Link href={`/?modal=teams/${team.id}`} as={`/teams/${team.id}`} key={team.id}>
          <div className="flex flex-col gap-4 rounded-xl border-2 border-gray-400 p-4">
            <Image
              src={team.image ?? "/placeholder-image.png"} // Fallback image if `team.image` is empty
              alt={team.name ?? "Team Image"}
              width={196}
              height={196}
              className="team-image rounded-xl"
            />
            <h1>{team.name}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateTeamButton = ({ toggle, setToggle }: Props) => {
  return (
    <Button onClick={() => setToggle(!toggle)}>
      <PlusIcon />
    </Button>
  );
};
