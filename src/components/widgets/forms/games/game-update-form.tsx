import { useForm } from "react-hook-form";
import {
  useCreateGame,
  useUpdateGame,
} from "~/components/shared/lib/hooks/games";
import { useGetTeams } from "~/components/shared/lib/hooks/team";
import { zodResolver } from "@hookform/resolvers/zod";

import { gameSchema } from "../schemas";
import { GameFormLayout } from "./game-form-layout";

import type { z } from "zod";
import type { IGame } from "~/components/shared/lib/models/games";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  game: IGame;
};

export const GameUpdateForm = ({ toggle, setToggle, game }: Props) => {
  const {
    data: teams,
    isLoading: isTeamsLoading,
    isError: isErrorTeams,
  } = useGetTeams();

  const { mutate: server_updateGame } = useUpdateGame();

  const form = useForm<z.infer<typeof gameSchema>>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      home_team_id: game.home_team_id,
      away_team_id: game.away_team_id,
      date: game.date,
      venue: game.venue,
      match_report: game.match_report,
    },
  });

  function onSubmit(values: z.infer<typeof gameSchema>) {
    server_updateGame({ ...values, game_id: game.id });
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
