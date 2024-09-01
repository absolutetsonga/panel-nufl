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
import { CustomFormField } from "~/components/shared/ui/form-field";

import { Button } from "~/components/shared/ui";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";

import { toast } from "sonner";
import { XIcon } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Player fullname must be at least 2 characters.",
  }),
  image: z.string().url({
    message: "Please upload a valid player image URL.",
  }),
  position: z.enum(
    ["Goalkeeper", "Defender", "Left Winger", "Right Winger", "Striker"],
    {
      errorMap: () => {
        return { message: "Please select a valid position" };
      },
    },
  ),
  major: z.string().min(2, {
    message: "Sorry, major is mandatory.",
  }),
  age: z.string(),
});

type Props = {
  player: {
    team_id: number;
    id: number;
    fullname: string;
    image: string | null;
    position: string;
    major: string;
    age: number;
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
      image: player.image ?? "",
      position: player.position ?? undefined,
      major: player.major,
      age: String(player.age) ?? "0",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (Number.isNaN(values.age)) {
      toast.error("Age must be a number.");
      return null;
    }
    const age = Number(values.age);

    server_updateTeam({
      player_id: player.id,
      player: { ...values, age, team_id: player.team_id },
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

          <CustomFormField
            form={form}
            name="fullname"
            label="Player Full Name"
            placeholder="Ex: John Doe"
            description="Write down player full name."
          />

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

          <CustomFormField
            form={form}
            name="major"
            label="Player Major"
            placeholder="Ex: Computer Science"
            description="Write down player major."
          />
          <CustomFormField
            form={form}
            name="age"
            type="number"
            label="Player Age"
            placeholder="Ex: 19"
            description="Write down player age."
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
