import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/entities/command/ui/form";

import { Button, Input } from "~/components/shared/ui";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";

import { useUpdateTeam } from "~/components/shared/lib/hooks/team";
import { teamSchema } from "./schemas";

import type { z } from "zod";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  team: { id: number; name: string | null; image: string | null };
};

export const TeamUpdateForm = ({ toggle, setToggle, team }: Props) => {
  const { mutate: server_updateTeam } = useUpdateTeam();

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team.name ?? "",
      image: team.image ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof teamSchema>) {
    server_updateTeam({ id: team.id, name: values.name, image: values.image });
    setToggle(false);
  }

  if (!toggle) return <></>;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative rounded-xl border-gray-400 p-1"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center">
                <FormLabel className="w-1/3">Team Name</FormLabel>
                <FormControl className="w-2/3">
                  <Input placeholder="Team Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem className="flex items-center justify-center">
                <FormLabel className="w-1/3">Team Image</FormLabel>
                <FormControl className="w-2/3">
                  <UploadButton
                    endpoint="teamImage"
                    onClientUploadComplete={(res) => {
                      form.setValue("image", res[0]?.url ?? "");
                    }}
                    onUploadError={(error: Error) => {
                      console.error(error);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-indigo-700 text-white" type="submit">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};
