import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/entities/command/ui/form";

import { Button, Input } from "~/components/shared/ui";

import { XIcon } from "lucide-react";

import { useUpdateTournament } from "~/components/shared/lib/hooks/tournament";
import { tournamentSchema } from "../schemas";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  tournament: {
    name: string;
    id: number;
  };
};

export const TournamentUpdateForm = ({
  toggle,
  setToggle,
  tournament,
}: Props) => {
  const { mutate: server_updateTournament } = useUpdateTournament();

  const form = useForm<z.infer<typeof tournamentSchema>>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      name: tournament.name,
    },
  });

  function onSubmit(values: z.infer<typeof tournamentSchema>) {
    server_updateTournament({ ...values, id: tournament.id });
    setToggle(false);
  }

  if (!toggle) return <></>;

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-black p-8 shadow-lg md:p-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-8 rounded-xl border-2 border-gray-900 bg-gray-800 p-6 md:p-8"
        >
          <Button
            onClick={() => setToggle(false)}
            className="absolute right-2 top-2 p-1 text-slate-300 hover:text-slate-50"
          >
            <XIcon />
          </Button>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-50">
                  Tournament Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Team Name"
                    {...field}
                    className="rounded-md text-black focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormDescription className="text-[14px] text-slate-300">
                  Edit Tournament Name
                </FormDescription>
                <FormMessage className="mt-2 text-[12px] text-red-600" />
              </FormItem>
            )}
          />
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