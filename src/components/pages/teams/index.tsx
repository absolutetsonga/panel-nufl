"use client";

import { PageContainer } from "~/components/shared/ui";
import { TeamForm } from "~/components/widgets/forms/team-form";
import { Button } from "~/components/shared/ui";

import Image from "next/image";

import { useState } from "react";
import { useGetTeams } from "~/components/shared/lib/hooks/team";

export const TeamsPage = () => {
  const [createTeamToggle, setCreateTeamToggle] = useState(false);

  return (
    <PageContainer>
      <CreateTeamButton
        toggle={createTeamToggle}
        setToggle={setCreateTeamToggle}
      />
      <PopulateTeams />
      <TeamForm toggle={createTeamToggle} setToggle={setCreateTeamToggle} />
    </PageContainer>
  );
};

const PopulateTeams = () => {
  const { data: teams, isLoading, isError } = useGetTeams();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading teams.</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {teams?.map((team) => (
        <div key={team.id} className="team-card">
          <h1>{team.name}</h1>
          <Image
            src={team.image ?? "/placeholder-image.png"} // Fallback image if `team.image` is empty
            alt={team.name ?? "Team Image"}
            width={196}
            height={196}
            className="team-image"
          />
        </div>
      ))}
    </div>
  );
};

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateTeamButton = ({ toggle, setToggle }: Props) => {
  return <Button onClick={() => setToggle(!toggle)}>Create Team</Button>;
};
