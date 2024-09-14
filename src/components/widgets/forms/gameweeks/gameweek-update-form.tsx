import { useForm } from "react-hook-form";
import { useUpdateGameweek } from "~/components/shared/lib/hooks/gameweeks";

import { GameweekFormLayout } from "./gameweek-form-layout";

import { gameweekSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import type { z } from "zod";
import type { IGameWeek } from "~/components/shared/lib/models/gameweek";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  gameweek: IGameWeek;
};

export const GameweekUpdateForm = ({ toggle, setToggle, gameweek }: Props) => {
  const { mutate: server_updateGameweek } = useUpdateGameweek();

  const form = useForm<z.infer<typeof gameweekSchema>>({
    resolver: zodResolver(gameweekSchema),
    defaultValues: {
      number: gameweek.number,
    },
  });

  function onSubmit({ number }: z.infer<typeof gameweekSchema>) {
    server_updateGameweek({
      id: gameweek.id,
      number,
    });
    setToggle(false);
  }

  function onInvalid() {
    console.error(form.formState.errors);
  }

  if (!toggle) return <></>;

  return (
    <GameweekFormLayout
      form={form}
      toggle={toggle}
      setToggle={setToggle}
      onSubmit={onSubmit}
      onInvalid={onInvalid}
    />
  );
};
