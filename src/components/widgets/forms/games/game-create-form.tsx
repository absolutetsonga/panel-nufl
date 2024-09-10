import { useForm } from "react-hook-form";
import { useCreateGame } from "~/components/shared/lib/hooks/games";
import { useGetTeams } from "~/components/shared/lib/hooks/team";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/entities/command/ui/form";

import { SelectForm } from "~/components/entities/select-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/shared/ui/popover";
import { Button } from "~/components/shared/ui";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/components/shared/lib/utils/clsx";
import { format } from "date-fns";
import { Calendar } from "~/components/shared/ui/calendar";
import { TimePickerDemo } from "../../time-picker";

import { gameSchema } from "../schemas";
import type { z } from "zod";
import { InputForm } from "~/components/entities/input-form";
import { SubmitButton } from "~/components/entities/submit-button";
import { CloseButton } from "~/components/entities/close-button";

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
          <CloseButton closeClick={() => setToggle(false)} />

          <div className="mt-10 flex flex-row items-center justify-center gap-4">
            <SelectForm
              form={form}
              name={"home_team_id"}
              label={"Home Team"}
              itemValues={select_teams}
              placeholder="Select home team"
              description="Please select the home team of the game"
              onValueChange={(value) => {
                form.setValue("home_team_id", Number(value));
              }}
            />
            <SelectForm
              form={form}
              name={"away_team_id"}
              label={"Away Team"}
              itemValues={select_teams}
              placeholder="Select away team"
              description="Please select the away team of the game"
              onValueChange={(value) => {
                form.setValue("away_team_id", Number(value));
              }}
            />
          </div>

          <SelectForm
            form={form}
            name={"venue"}
            label={"Venue"}
            itemValues={[
              { value: "Sports Center", name: "Sports Center" },
              { value: "Athetic Center", name: "Athetic Center" },
            ]}
            placeholder="Select venue"
            description="Please select the venue of the game"
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-left">Date Time</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP HH:mm:ss")
                        ) : (
                          <span>Pick a date time</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto bg-white p-0 text-black">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromDate={new Date(1980, 0o1, 0o1)}
                      toDate={new Date()}
                      initialFocus
                    />
                    <div className="border-border border-t p-3">
                      <TimePickerDemo
                        setDate={field.onChange}
                        date={field.value}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <InputForm
            name={"match_report"}
            onChange={undefined}
            form={form}
            label={"Math Report (Optional)"}
            placeholder={"John Doe is MVP of the game"}
            description={"Write an interesting event occured on the game"}
          />

          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
