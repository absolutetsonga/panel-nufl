import { useForm } from "react-hook-form";
import { useCreateTournament } from "~/components/shared/lib/hooks/tournament";

import { zodResolver } from "@hookform/resolvers/zod";
import { tournamentSchema } from "../schemas";
import { TournamentFormLayout } from "./tournament-form-layout";

import type { z } from "zod";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
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
    <div className="absolute left-0 top-0 right-0 bottom-0 z-20 w-full mt-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-black shadow-lg">
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
