"use client";

import { PencilIcon, Trash2Icon } from "lucide-react";
import {
  useDeleteTournament,
  useGetTournaments,
} from "~/components/shared/lib/hooks/tournament";
import { useState } from "react";

import { TournamentCreateForm } from "~/components/widgets/forms/tournament/tournament-create-form";
import { PageContainer } from "~/components/shared/ui";
import { Heading1, Paragraph } from "~/components/shared/ui/typography";
import { CreateButton } from "~/components/entities/create-button";
import { DeleteAlert } from "~/components/entities/delete-alert/ui";
import { TournamentUpdateForm } from "~/components/widgets/forms/tournament/tournament-update-form";

export const TournamentPage = () => {
  const [createTournamentToggle, setCreateTournamentToggle] = useState(false);

  return (
    <PageContainer justify="normal">
      <div className="flex w-full flex-col gap-4 p-4">
        <Heading1>Tournaments</Heading1>
        <PopulateTournaments />
        <CreateButton
          toggle={createTournamentToggle}
          setToggle={setCreateTournamentToggle}
          className="absolute right-0"
        />
      </div>

      {createTournamentToggle && (
        <TournamentCreateForm
          toggle={createTournamentToggle}
          setToggle={setCreateTournamentToggle}
        />
      )}
    </PageContainer>
  );
};

const PopulateTournaments = () => {
  const { data: tournament, isLoading, isError } = useGetTournaments();
  const { mutate: server_deleteTournament } = useDeleteTournament();

  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);

  if (isLoading) return <Paragraph>Loading...</Paragraph>;
  if (isError) return <Paragraph>Error loading tournaments.</Paragraph>;
  if (!tournament) return <Paragraph>No tournaments found.</Paragraph>;
  const onDelete = (tournament_id: number) => {
    server_deleteTournament(tournament_id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-4">
      <div>
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-gray-400 relative  p-8">
          <h1 className="text-[20px]">{tournament.name}</h1>

          <div className="absolute right-1 top-1 flex flex-row items-center justify-center gap-2">
            <Trash2Icon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setDeleteToggle(!deleteToggle)}
            />
            <PencilIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setUpdateToggle(!updateToggle)}
            />
          </div>

          {deleteToggle && (
            <DeleteAlert
              trigger="Delete?"
              title={`Delete ${tournament.name} Team`}
              description="Are you sure? This action cannot be undone. This will permanently delete this tournaments all teams, games, scores, players, their goals, assists, clean sheets data from our servers. It basically means that you will lose all tournament data. In special cases we recommend to contact with developer to delete the team."
              onConfirm={() => onDelete(tournament.id)}
              onCancel={() => setDeleteToggle(false)}
            />
          )}
        </div>

        {updateToggle && (
          <TournamentUpdateForm
            toggle={updateToggle}
            setToggle={setUpdateToggle}
            tournament={{ id: tournament.id, name: tournament.name ?? "" }}
          />
        )}
      </div>
    </div>
  );
};
