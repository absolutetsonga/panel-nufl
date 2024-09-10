import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/entities/command/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shared/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/shared/ui/popover";

import { SelectForm } from "~/components/entities/select-form";
import { Calendar } from "~/components/shared/ui/calendar";
import { Button } from "~/components/shared/ui";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";
import { CalendarIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import Image from "next/image";

import { format } from "date-fns";
import { cn } from "~/components/shared/lib/utils/clsx";

import {
  levelOfStudyItemValues,
  numberOfYearsItemValues,
  positionsItemValues,
  schoolNameItemValues,
} from "./constants";

import type { z } from "zod";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { playerSchema } from "../schemas";
import { InputForm } from "~/components/entities/input-form";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
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
    <div className="flex max-w-5xl flex-col gap-4 rounded-lg p-6 shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="relative flex w-full flex-col gap-4"
        >
          <Button
            onClick={() => setToggle(false)}
            className="absolute -right-2 top-0 text-slate-300 hover:text-slate-50"
          >
            <XIcon />
          </Button>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
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

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <SelectForm
              form={form}
              name="level_of_study"
              label="Level of Study"
              itemValues={levelOfStudyItemValues}
              placeholder="Select level of study"
              description="Please select the study level of this player"
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

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Date of birth</FormLabel>
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
                        selected={field.value}
                        fromDate={new Date(1980, 0o1, 0o1)}
                        toDate={new Date()}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-[14px] text-slate-300">
                    Used to calculate age of player.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
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
                placeholder="Select course year"
                description="Please select the course year of the player"
                className={"w-full md:w-1/2"}
                onValueChange={(value) => {
                  form.setValue("year", Number(value));
                }}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="max-w-min">
                <FormLabel className="text-sm font-medium text-slate-50">
                  Player Image
                </FormLabel>
                <FormControl className="">
                  <UploadButton
                    endpoint="playerImage"
                    onClientUploadComplete={(res) => {
                      const newImage = res[0]?.url ?? "";
                      form.setValue("image", newImage);
                      toast("You successfully uploaded image");
                    }}
                    onUploadError={(error: Error) => {
                      console.error(error);
                      toast(`Something went wrong.`);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-[14px] text-slate-300">
                  Upload here player image.
                </FormDescription>
                <FormMessage className="mt-2 text-[12px] text-red-600" />
                {field.value && (
                  <div className="mt-4 w-full items-center justify-center">
                    <Image
                      src={field.value}
                      alt="Uploaded Player Image"
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full border-2 border-gray-300 object-cover"
                    />
                  </div>
                )}
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
