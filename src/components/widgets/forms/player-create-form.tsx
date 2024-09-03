import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Player fullname must be at least 2 characters.",
  }),
  image: z
    .string()
    .url()
    .default(
      "https://utfs.io/f/aeb9ab9b-7970-4eed-8fc1-92ac644c1165-clf4u5.jpg",
    ),
  position: z.string(),
  level_of_study: z.string().min(2, {
    message: "Sorry, major is mandatory.",
  }),
  school: z.string().min(2, {
    message: "Sorry, school is mandatory.",
  }),
  year: z.string().min(1, {
    message: "Please, provide player's course year.",
  }),
  age: z.date({
    required_error: "A date of birth is required.",
  }),
});

type Props = {
  team_id: number;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerCreateForm = ({ team_id, toggle, setToggle }: Props) => {
  const { mutate: server_createTeam } = useCreatePlayer();
  const [isFoundation, setIsFoundation] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-6 shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="relative grid grid-cols-2 gap-6 rounded-xl"
        >
          <Button
            onClick={() => setToggle(false)}
            className="absolute -right-2 -top-2 text-slate-300 hover:text-slate-50"
          >
            <XIcon />
          </Button>

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-50">
                  Player Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: John Doe"
                    {...field}
                    className="bg-black rounded-md focus:border-indigo-500 focus:ring-indigo-500"
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
              <FormItem>
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

          <FormField
            control={form.control}
            name="level_of_study"
            render={({ field }) => (
              <FormItem>
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
                      form.setValue("year", "0");
                    } else {
                      setIsFoundation(false);
                      form.setValue("school", "");
                      form.setValue("year", "");
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

          {!isFoundation && (
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-50">
                    School Name
                  </FormLabel>
                  <Select
                    disabled={isFoundation}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Click to choose..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black">
                      <SelectItem value="SEDS">SEDS</SelectItem>
                      <SelectItem value="SSH">SSH</SelectItem>
                      <SelectItem value="NUSOM">NUSOM</SelectItem>
                      <SelectItem value="GSB">GSB</SelectItem>
                      <SelectItem value="GSE">GSE</SelectItem>
                      <SelectItem value="GSPP">GSPP</SelectItem>
                      <SelectItem value="SMG">SMG</SelectItem>
                      <SelectItem value="SHSS">SHSS</SelectItem>
                      <SelectItem value="CPS" className="hidden">
                        CPS
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-50">
                    Course Year
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
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
                <FormDescription>
                  Date of birth will be used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-50">
                    Player Image
                  </FormLabel>
                  <FormControl>
                    <UploadButton
                      endpoint="playerImage"
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0]?.url ?? "");
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error);
                      }}
                    />
                  </FormControl>
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
                  <FormDescription className="text-[14px] text-slate-300">
                    Upload here player image.
                  </FormDescription>
                  <FormMessage className="mt-2 text-[12px] text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
