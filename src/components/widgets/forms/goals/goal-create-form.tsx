import { useForm } from "react-hook-form";
import { useCreateGoal } from "~/components/shared/lib/hooks/goals";
import { useUpdateGameScore } from "~/components/shared/lib/hooks/games";
import {
  useUpdatePlayerAssistScore,
  useUpdatePlayerGoalScore,
} from "~/components/shared/lib/hooks/player";

import { goalSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/entities/command/form";
import { CloseButton } from "~/components/entities/close-button";
import { SubmitButton } from "~/components/entities/submit-button";
import { Checkbox } from "~/components/shared/ui";
import { SelectForm } from "~/components/entities/select-form";

import type { z } from "zod";
import type { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/game";

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
  const { mutate: server_updateGameScore } = useUpdateGameScore();
  const { mutate: server_updatePlayerGoalScore } = useUpdatePlayerGoalScore();
  const { mutate: server_updatePlayerAssistScore } =
    useUpdatePlayerAssistScore();

  const form = useForm<z.infer<typeof goalSchema>>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      player_id: 0,
      assist_player_id: 0,
      is_own_goal: false,
    },
  });

  function findTeamId(
    isOwnGoal: boolean,
    teamType: "home" | "away",
    game: IGameInGameweeksWithTeamPlayersAndGoals,
  ): number {
    if (isOwnGoal && teamType === "home") return game.away_team_id;
    else if (!isOwnGoal && teamType === "home") return game.home_team_id;
    else if (isOwnGoal && teamType === "away") return game.home_team_id;
    else if (!isOwnGoal && teamType === "away") return game.away_team_id;
    else return 0;
  }

  function findSelectItemValues(
    teamType: "home" | "away",
    game: IGameInGameweeksWithTeamPlayersAndGoals,
  ) {
    if (teamType === "home") {
      return game.home_team.players.map((pl) => ({
        value: String(pl.id),
        name: pl.fullname,
        isHidden: false,
      }));
    } else {
      return game.away_team.players.map((pl) => ({
        value: String(pl.id),
        name: pl.fullname,
        isHidden: false,
      }));
    }
  }

  const selectItemValues = findSelectItemValues(teamType, game);

  function onSubmit(values: z.infer<typeof goalSchema>) {
    const teamId = findTeamId(form.getValues().is_own_goal, teamType, game);

    if (teamType === "home") {
      const updateGame = {
        game_id: game.id,
        home_team_score: game.home_team_score + 1,
        away_team_score: game.away_team_score,
      };

      const [scoredPlayer] = game.home_team.players.filter(
        (pl) => pl.id === values.player_id,
      );
      const [assistPlayer] = game.home_team.players.filter(
        (pl) => pl.id === values.assist_player_id,
      );

      if (!scoredPlayer) return "Can not update scored player goals score";
      if (!assistPlayer) return "Can not update assist player goals score";

      const updateScoredPlayer = {
        player: {
          id: scoredPlayer.id,
          goals: scoredPlayer.goals + 1,
        },
      };

      const updateAssistPlayer = {
        player: {
          id: assistPlayer.id,
          assists: assistPlayer.assists + 1,
        },
      };

      server_createGoal({
        ...values,
        game_id: game.id,
        team_id: teamId,
        assist_player_id: assistPlayer.id,
      });
      server_updateGameScore(updateGame);
      server_updatePlayerGoalScore(updateScoredPlayer);
      server_updatePlayerAssistScore(updateAssistPlayer);
    } else if (teamType === "away") {
      const updateGame = {
        game_id: game.id,
        home_team_score: game.home_team_score,
        away_team_score: game.away_team_score + 1,
      };
      const scoredPlayer = game.away_team.players.filter(
        (pl) => pl.id === values.player_id,
      );
      console.log(scoredPlayer);
      server_updateGameScore(updateGame);
    }

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
          <CloseButton closeClick={() => setToggle(false)} />

          <FormField
            control={form.control}
            name="is_own_goal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is own goal</FormLabel>
                </div>
              </FormItem>
            )}
          />

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
