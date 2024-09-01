import { useForm } from "react-hook-form";
import { useUpdatePlayer } from "~/components/shared/lib/hooks/player";
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
import { Calendar } from "~/components/shared/ui/calendar";
import { Button } from "~/components/shared/ui";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";

import { format } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "~/components/shared/lib/utils/clsx";

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
  year: z.number().min(0, {
    message: "Please, provide player's course year.",
  }),
  age: z.date({
    required_error: "A date of birth is required.",
  }),
});

type Props = {
  player: {
    id: number;
    team_id: number;
    fullname: string;
    image: string;
    position: string;
    level_of_study: string;
    school: string;
    age: Date;
    year: number;
  };
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerUpdateForm = ({ player, toggle, setToggle }: Props) => {
  const { mutate: server_updateTeam } = useUpdatePlayer();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: player.fullname,
      image: player.image,
      position: player.position,
      school: player.school,
      year: player.year,
      age: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    server_updateTeam({
      player_id: player.id,
      player: { ...values, team_id: player.team_id },
    });
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
            className="absolute -right-2 -top-2 text-gray-500 hover:text-gray-700"
          >
            <XIcon />
          </Button>

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
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
                  <SelectContent className="bg-white">
                    <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                    <SelectItem value="Defender">Defender</SelectItem>
                    <SelectItem value="Left Winger">Left Winger</SelectItem>
                    <SelectItem value="Right Winger">Right Winger</SelectItem>
                    <SelectItem value="Striker">Striker</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-[14px] text-gray-500">
                  Select player position.
                </FormDescription>
                <FormMessage className="mt-2 text-[12px] text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
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
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
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
                  <FormLabel className="text-sm font-medium text-gray-700">
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
                  <FormDescription className="text-[14px] text-gray-500">
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
