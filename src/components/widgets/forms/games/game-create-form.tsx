import { useForm } from "react-hook-form";
import { useCreateGame } from "~/components/shared/lib/hooks/games";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/entities/command/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/shared/ui/popover";

import type { z } from "zod";
import { gameSchema } from "../schemas";
import { Button, Input } from "~/components/shared/ui";
import { CalendarIcon, XIcon } from "lucide-react";
import { useGetTeams } from "~/components/shared/lib/hooks/team";
import { SelectForm } from "~/components/entities/select-form";
import { cn } from "~/components/shared/lib/utils/clsx";
import { format } from "date-fns";
import { Calendar } from "~/components/shared/ui/calendar";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  gameweek_number: number;
};

export const GameCreateForm = ({
  toggle,
  setToggle,
  gameweek_number,
}: Props) => {
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
    server_createGame({ ...values, gameweek_number });
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

  const select_teams = teams?.map((team) => ({
    name: team.name,
    value: String(team.id),
  }));

  return (
    <div className="flex max-w-5xl flex-col gap-4 rounded-lg p-6 shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="relative flex w-full flex-col gap-4"
        >
          <Button
            onClick={() => setToggle(false)}
            className="absolute right-2 top-2 p-1 text-slate-300 hover:text-slate-50"
          >
            <XIcon />
          </Button>
          <div className="mt-10 flex flex-row items-center justify-center gap-4">
            <FormField
              control={form.control}
              name="home_team_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-50">
                    Home Team
                  </FormLabel>
                  <SelectForm
                    itemValues={select_teams}
                    onValueChange={(value) => {
                      field.onChange(Number(value));
                    }}
                    defaultValue={String(field.value)}
                  />
                  <FormMessage className="mt-2 text-[12px] text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="away_team_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-50">
                    Away Team
                  </FormLabel>
                  <SelectForm
                    itemValues={select_teams}
                    onValueChange={(value) => {
                      field.onChange(Number(value));
                    }}
                    defaultValue={String(field.value)}
                  />
                  <FormMessage className="mt-2 text-[12px] text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-50">
                  Venue
                </FormLabel>
                <SelectForm
                  itemValues={[
                    { value: "Sports Center", name: "Sports Center" },
                    { value: "Athetic Center", name: "Athetic Center" },
                  ]}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                />
                <FormMessage className="mt-2 text-[12px] text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-50">
                  Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      className="z-20 bg-white text-black"
                      mode="single"
                      fromDate={new Date(2024, 8, 1)}
                      toDate={new Date(2025, 11, 31)}
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="mt-2 text-[12px] text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="match_report"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-50">
                  Match Report (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: John Doe scored 5 goals"
                    {...field}
                    className="rounded-md bg-black focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage className="mt-2 text-[12px] text-red-600" />
              </FormItem>
            )}
          />

          <div className="w-[200px]">
            <Button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
