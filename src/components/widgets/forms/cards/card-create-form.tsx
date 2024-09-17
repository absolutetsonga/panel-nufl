import { useForm } from "react-hook-form";
import { useCreateCard } from "~/components/shared/lib/hooks/cards";

import { cardSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/entities/command/form";
import { CloseButton } from "~/components/entities/close-button";
import { SubmitButton } from "~/components/entities/submit-button";
import { SelectForm } from "~/components/entities/select-form";

import type { z } from "zod";
import type { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/game";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  game: IGameInGameweeksWithTeamPlayersAndGoals;
  teamType: "home" | "away";
};

export function findTeamId(
  teamType: "home" | "away",
  game: IGameInGameweeksWithTeamPlayersAndGoals,
): number {
  if (teamType === "home") return game.home_team_id;
  return game.away_team_id;
}

export const CardCreateForm = ({
  game,
  teamType,
  toggle,
  setToggle,
}: Props) => {
  const { mutate: server_createCard } = useCreateCard();

  const teamId = findTeamId(teamType, game);

  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      player_id: 0,
      is_yellow: true,
    },
  });

  const team = teamType === "home" ? game.home_team : game.away_team;

  const selectItemValuesPlayers = team.players.map((pl) => ({
    value: String(pl.id),
    name: pl.fullname,
  }));

  const selectItemValuesCards = [
    { value: "true", name: "Yellow card" },
    { value: "false", name: "Red card" },
  ];

  async function onSubmit(values: z.infer<typeof cardSchema>) {
    server_createCard({ ...values, team_id: team.id, game_id: game.id });
    setToggle(false);
  }

  function onInvalid() {
    console.error(form.formState.errors);
  }

  if (!toggle) return <></>;

  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 z-20 mt-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-black shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="relative flex max-w-[400px] flex-col gap-4"
        >
          <div className="absolute -right-2 -top-14">
            <CloseButton closeClick={() => setToggle(false)} />
          </div>

          <SelectForm
            form={form}
            name={"player_id"}
            label={"Player"}
            placeholder={"ex: John Doe"}
            description={"Player who got a card"}
            itemValues={selectItemValuesPlayers}
            onValueChange={(value) => {
              form.setValue("player_id", Number(value));
            }}
          />

          <SelectForm
            form={form}
            name={"is_yellow"}
            label={"Card Type"}
            placeholder={"ex: Yellow Card"}
            description={"Choose card type"}
            itemValues={selectItemValuesCards}
            onValueChange={(value) => {
              form.setValue("is_yellow", "true" === value);
            }}
          />
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
