import { useForm } from "react-hook-form";

import { goalSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/entities/command/form";
import { CloseButton } from "~/components/entities/close-button";
import { SubmitButton } from "~/components/entities/submit-button";
import { SelectForm } from "~/components/entities/select-form";

import type { z } from "zod";
import type { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/game";
import { CheckboxForm } from "~/components/entities/checkbox-form";
import { findSelectItemValues } from "./utils";
import { useCreateGoal } from "~/components/shared/lib/hooks/goals";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  game: IGameInGameweeksWithTeamPlayersAndGoals;
  teamType: "home" | "away";
};

export const GoalCreateForm = ({
  game,
  teamType,
  toggle,
  setToggle,
}: Props) => {
  const { mutate: server_createGoal } = useCreateGoal();
  const form = useForm<z.infer<typeof goalSchema>>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      player_id: 0,
      assist_player_id: 0,
      is_own_goal: false,
    },
  });

  const selectItemValues = findSelectItemValues(teamType, game);

  async function onSubmit(values: z.infer<typeof goalSchema>) {
    server_createGoal({ goal: values, game, teamType });
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

          <CheckboxForm form={form} name={"is_own_goal"} label={"Own goal"} />

          <SelectForm
            form={form}
            name={"player_id"}
            label={"Scored Player"}
            placeholder={"ex: John Doe"}
            description={"Player scored a goal"}
            itemValues={selectItemValues}
            onValueChange={(value) => {
              form.setValue("player_id", Number(value));
            }}
          />

          <SelectForm
            form={form}
            name={"assist_player_id"}
            label={"Assisted Player"}
            placeholder={"ex: John Doe"}
            description={"Player assisted"}
            itemValues={selectItemValues}
            onValueChange={(value) => {
              form.setValue("assist_player_id", Number(value));
            }}
          />
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
