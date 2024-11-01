import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useCreateGameweek } from "~/components/shared/lib/hooks/gameweeks";

import { gameweekSchema } from "../schemas";
import { GameweekFormLayout } from "./gameweek-form-layout";

import type { z } from "zod";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GameweekCreateForm = ({ toggle, setToggle }: Props) => {
  const { mutate: server_createGameweek } = useCreateGameweek();

  const form = useForm<z.infer<typeof gameweekSchema>>({
    resolver: zodResolver(gameweekSchema),
    defaultValues: {
      number: 0,
    },
  });

  function onSubmit({ number }: z.infer<typeof gameweekSchema>) {
    server_createGameweek(number);
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
