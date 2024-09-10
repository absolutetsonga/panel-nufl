import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";

import { useUpdateTournament } from "~/components/shared/lib/hooks/tournament";
import { tournamentSchema } from "../schemas";
import { TournamentFormLayout } from "./tournament-form-layout";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  tournament: {
    name: string;
    id: number;
  };
};

export const TournamentUpdateForm = ({
  toggle,
  setToggle,
  tournament,
}: Props) => {
  const { mutate: server_updateTournament } = useUpdateTournament();

  const form = useForm<z.infer<typeof tournamentSchema>>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      name: tournament.name,
    },
  });

  function onSubmit(values: z.infer<typeof tournamentSchema>) {
    server_updateTournament({ ...values, id: tournament.id });
    setToggle(false);
  }

  function onInvalid() {
    console.log(form.formState.errors);
  }
  if (!toggle) return <></>;

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-black p-8 shadow-lg md:p-12">
      <TournamentFormLayout
        form={form}
        toggle={toggle}
        setToggle={setToggle}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
      />
    </div>
  );
};
