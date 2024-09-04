import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

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
import { format } from "date-fns";

import { Calendar } from "~/components/shared/ui/calendar";

import { Button, Input } from "~/components/shared/ui";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";

import Image from "next/image";
import { CalendarIcon, XIcon } from "lucide-react";
import { useCreatePlayer } from "~/components/shared/lib/hooks/player";
import { cn } from "~/components/shared/lib/utils/clsx";
import { useState } from "react";
import { toast } from "sonner";
import { playerSchema } from "./schemas";
import { SelectForm } from "~/components/entities/select-form/intex";

type Props = {
  team_id: number;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerCreateForm = ({ team_id, toggle, setToggle }: Props) => {
  const { mutate: server_createTeam } = useCreatePlayer();
  const [isFoundation, setIsFoundation] = useState(true);
  const [newImage, setNewImage] = useState<string>();

  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
  });

  function onSubmit(values: z.infer<typeof playerSchema>) {
    const number_year = Number(values.year);
    if (Number.isNaN(number_year)) {
      toast("Course year must be integer");
      return null;
    }

    server_createTeam({ ...values, team_id, year: number_year });
    setToggle(false);
  }

  function onInvalid() {
    console.error(form.formState.errors);
  }

  if (!toggle) return <></>;

  type ItemValue = {
    value: string;
    name: string;
    isHidden: boolean;
  };

  const itemValues: ItemValue[] = [
    { value: "SEDS", name: "SEDS", isHidden: false },
    { value: "SSH", name: "SSH", isHidden: false },
    { value: "NUSOM", name: "NUSOM", isHidden: false },
    { value: "GSB", name: "GSB", isHidden: false },
    { value: "GSE", name: "GSE", isHidden: false },
    { value: "GSPP", name: "GSPP", isHidden: false },
    { value: "SMG", name: "SMG", isHidden: false },
    { value: "CPS", name: "CPS", isHidden: true },
  ];

  return (
    <div className="flex max-w-5xl flex-col items-center justify-center gap-4 rounded-lg p-6 shadow-lg">
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
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel className="text-sm font-medium text-slate-50">
                    Player Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: John Doe"
                      {...field}
                      className="rounded-md bg-black focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormDescription className="text-[14px] text-slate-300">
                    Write down player full name.
                  </FormDescription>
                  <FormMessage className="mt-2 text-[12px] text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel className="text-sm font-medium text-slate-50">
                    Player Position
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select player position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black">
                      <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                      <SelectItem value="Defender">Defender</SelectItem>
                      <SelectItem value="Left Winger">Left Winger</SelectItem>
                      <SelectItem value="Right Winger">Right Winger</SelectItem>
                      <SelectItem value="Striker">Striker</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-[14px] text-slate-300">
                    Select player position.
                  </FormDescription>
                  <FormMessage className="mt-2 text-[12px] text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="level_of_study"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel className="text-sm font-medium text-slate-50">
                    Level of Study
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
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
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Click to choose..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black">
                      <SelectItem value="FOUND">Foundation</SelectItem>
                      <SelectItem value="UG">Undergraduate</SelectItem>
                      <SelectItem value="GR">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-[14px] text-slate-300">
                    Select Level of Study
                  </FormDescription>
                  <FormMessage className="mt-2 text-[12px] text-red-600" />
                </FormItem>
              )}
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
                        fromDate={new Date(1950, 0o1, 0o1)}
                        toDate={new Date()}
                        selected={field.value}
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
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-sm font-medium text-slate-50">
                      School Name
                    </FormLabel>
                    <SelectForm
                      itemValues={itemValues}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isFoundation}
                    />
                    <FormDescription className="text-[14px] text-slate-300">
                      Select School
                    </FormDescription>
                    <FormMessage className="mt-2 text-[12px] text-red-600" />
                  </FormItem>
                )}
              />
            )}
            {!isFoundation && (
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-sm font-medium text-slate-50">
                      Course Year
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Click to choose..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black">
                        <SelectItem value={"0"} className="hidden">
                          0
                        </SelectItem>
                        <SelectItem value={"1"}>1</SelectItem>
                        <SelectItem value={"2"}>2</SelectItem>
                        <SelectItem value={"3"}>3</SelectItem>
                        <SelectItem value={"4"}>4</SelectItem>
                        <SelectItem value={"5"}>5</SelectItem>
                        <SelectItem value={"6"}>6</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-[14px] text-slate-300">
                      Select Course Year
                    </FormDescription>
                    <FormMessage className="mt-2 text-[12px] text-red-600" />
                  </FormItem>
                )}
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
                      setNewImage(newImage);
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
