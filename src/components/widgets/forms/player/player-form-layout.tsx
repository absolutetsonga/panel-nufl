import { Form } from "~/components/entities/command/ui/form";
import { SelectForm } from "~/components/entities/select-form";
import { InputForm } from "~/components/entities/input-form";
import { SubmitButton } from "~/components/entities/submit-button";
import { CloseButton } from "~/components/entities/close-button";
import { DateTimeForm } from "~/components/entities/date-time-form";
import { ImageUploadForm } from "~/components/entities/image-upload-form";

import type { z } from "zod";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { playerSchema } from "../schemas";

import {
  levelOfStudyItemValues,
  numberOfYearsItemValues,
  positionsItemValues,
  schoolNameItemValues,
} from "./constants";

type Props = {
  isFoundation?: boolean;
  setIsFoundation?: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      image: string;
      fullname: string;
      position: string;
      school: string;
      level_of_study: string;
      year: number;
      age?: Date | undefined;
    },
    unknown,
    undefined
  >;

  onSubmit: (values: z.infer<typeof playerSchema>) => null | undefined;
  onInvalid: () => void;
};

export const PlayerFormLayout = ({
  isFoundation,
  setIsFoundation,
  setToggle,
  form,
  onSubmit,
  onInvalid,
}: Props) => {
  return (
    <div className={"flex max-w-5xl flex-col gap-4 rounded-lg p-6 shadow-lg"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className={"relative flex w-full flex-col gap-4"}
        >
          <CloseButton closeClick={() => setToggle(false)} />

          <div
            className={
              "mt-10 flex flex-col items-center justify-center gap-4 md:flex-row"
            }
          >
            <InputForm
              form={form}
              name={"fullname"}
              label={"Player Name"}
              placeholder={"ex: John Doe"}
              description={"Write down player full name"}
              className="w-full md:w-1/2"
            />

            <SelectForm
              form={form}
              name={"position"}
              label={"Player Position"}
              itemValues={positionsItemValues}
              placeholder={"Select player position"}
              description={"Please select the position of the player"}
              className={"w-full md:w-1/2"}
            />
          </div>

          <div
            className={
              "flex flex-col items-center justify-center gap-4 md:flex-row"
            }
          >
            <SelectForm
              form={form}
              name={"level_of_study"}
              label={"Level of Study"}
              itemValues={levelOfStudyItemValues}
              placeholder={"Select level of study"}
              description={"Please select the study level of this player"}
              className={"w-full md:w-1/2"}
              onValueChange={(value) => {
                if (setIsFoundation) {
                  setIsFoundation(value === "FOUND");
                  if (value === "FOUND") {
                    setIsFoundation(true);
                    form.setValue("school", "CPS");
                    form.setValue("year", 0);
                  } else {
                    setIsFoundation(false);
                    form.setValue("school", "");
                    form.setValue("year", 1);
                  }
                }
              }}
            />

            <DateTimeForm
              form={form}
              name={"age"}
              label="Date of Birth"
              placeholder="Pick a date"
              description="Used to calculate age of player."
              fromDate={new Date(1980, 0o1, 0o1)}
              toDate={new Date()}
              className={"w-full md:w-1/2"}
              withTimePicker
            />
          </div>

          <div className={"flex flex-col gap-4 md:flex-row"}>
            {!isFoundation && (
              <SelectForm
                form={form}
                name={"school"}
                label={"School Name"}
                itemValues={schoolNameItemValues}
                placeholder={"Select school name"}
                description={"Please select the school name of the player"}
                className={"w-full md:w-1/2"}
              />
            )}
            {!isFoundation && (
              <SelectForm
                form={form}
                name={"year"}
                label={"Course Year"}
                itemValues={numberOfYearsItemValues}
                placeholder={"Select course year"}
                description={"Please select the course year of the player"}
                className={"w-full md:w-1/2"}
                onValueChange={(value) => {
                  form.setValue("year", Number(value));
                }}
              />
            )}
          </div>

          <ImageUploadForm
            form={form}
            name={"image"}
            label={"Player Image"}
            endpoint={"playerImage"}
            description={"Please upload image of the player"}
          />

          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
