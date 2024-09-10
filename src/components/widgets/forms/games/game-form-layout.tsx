import { InputForm } from "~/components/entities/input-form";
import { SubmitButton } from "~/components/entities/submit-button";
import { CloseButton } from "~/components/entities/close-button";

import { Form } from "~/components/entities/command/ui/form";

import { SelectForm } from "~/components/entities/select-form";
import type { UseFormReturn } from "react-hook-form";
import type { gameSchema } from "../schemas";

import type { z } from "zod";
import { DateTimeForm } from "~/components/entities/date-time-form";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      home_team_id: number;
      venue: string;
      date: Date;
      match_report: string;
      away_team_id: number;
    },
    unknown,
    undefined
  >;

  onSubmit: (values: z.infer<typeof gameSchema>) => void;
  onInvalid: () => void;
  selectTeams: {
    name: string;
    value: string;
  }[];
};

export const GameFormLayout = ({
  form,
  selectTeams,
  onSubmit,
  onInvalid,
  setToggle,
}: Props) => {
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
              itemValues={selectTeams}
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
              itemValues={selectTeams}
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

          <DateTimeForm
            form={form}
            name={"date"}
            label={"Date Time"}
            description={"Please pick a date time of the game"}
            placeholder={"Pick a date time"}
            fromDate={new Date(2024, 9, 0o1)}
            toDate={new Date(2025, 11, 31)}
            withTimePicker={true}
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
// 167 lines
