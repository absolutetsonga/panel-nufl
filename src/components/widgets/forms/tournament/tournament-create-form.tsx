import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateTournament } from "~/components/shared/lib/hooks/tournament";
import { tournamentSchema } from "../schemas";
import { TournamentFormLayout } from "./tournament-form-layout";

import type { z } from "zod";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TournamentCreateForm = ({ toggle, setToggle }: Props) => {
  const { mutate: server_createTournament } = useCreateTournament();

  const form = useForm<z.infer<typeof tournamentSchema>>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof tournamentSchema>) {
    server_createTournament(values);
    setToggle(false);
  }

  function onInvalid() {
    console.error(form.formState.errors);
  }

  if (!toggle) return <></>;

  return (
    <TournamentFormLayout
      form={form}
      toggle={toggle}
      setToggle={setToggle}
      onSubmit={onSubmit}
      onInvalid={onInvalid}
    />
  );
};
