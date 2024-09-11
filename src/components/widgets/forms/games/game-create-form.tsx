import { useForm } from "react-hook-form";
import { useCreateGame } from "~/components/shared/lib/hooks/games";
import { useGetTeams } from "~/components/shared/lib/hooks/team";
import { zodResolver } from "@hookform/resolvers/zod";

import { gameSchema } from "../schemas";
import { GameFormLayout } from "./game-form-layout";

import type { z } from "zod";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  gameweek_id: number;
};

export const GameCreateForm = ({ toggle, setToggle, gameweek_id }: Props) => {
  const {
    data: teams,
    isLoading: isTeamsLoading,
    isError: isErrorTeams,
  } = useGetTeams();

  const { mutate: server_createGame } = useCreateGame();

  const form = useForm<z.infer<typeof gameSchema>>({
    resolver: zodResolver(gameSchema),
  });

  function onSubmit(values: z.infer<typeof gameSchema>) {
    server_createGame({ ...values, gameweek_id });
    setToggle(false);
  }

  function onInvalid() {
    console.error(form.formState.errors);
  }

  if (!toggle) return <></>;
  if (teams === undefined) return <div>Loading...</div>;
  if (teams?.length === 0) return <div>Please create teams first.</div>;
  if (isTeamsLoading) return <div>Loading...</div>;
  if (isErrorTeams) return <div>Error loading teams.</div>;

  const selectTeams = teams?.map((team) => ({
    name: team.name,
    value: String(team.id),
  }));

  return (
    <GameFormLayout
      form={form}
      toggle={toggle}
      setToggle={setToggle}
      onSubmit={onSubmit}
      onInvalid={onInvalid}
      selectTeams={selectTeams}
    />
  );
};
