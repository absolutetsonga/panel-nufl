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

import { gameweekSchema } from "../schemas";
import { useCreateGameweek } from "~/components/shared/lib/hooks/gameweeks";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GameweekCreateForm = ({ toggle, setToggle }: Props) => {
  const { mutate: server_createGameweek } = useCreateGameweek();

  const form = useForm<z.infer<typeof gameweekSchema>>({
    resolver: zodResolver(gameweekSchema),
  });

  function onSubmit({ number }: z.infer<typeof gameweekSchema>) {
    server_createGameweek(number);
    setToggle(false);
  }

  function onInvalid() {
    console.error(form.formState.errors);
  }

  if (!toggle) return <></>;

  return (
    <div className="flex max-w-5xl flex-col gap-4 rounded-lg p-6 shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="relative flex w-full flex-col gap-4"
        >
          <Button
            onClick={() => setToggle(false)}
            className="absolute -right-2 -top-2 text-slate-300 hover:text-slate-50"
          >
            <XIcon />
          </Button>

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-50">
                  Gameweek
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Team Name"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                    className="rounded-md text-black focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormDescription className="text-[14px] text-slate-300">
                  Write down gameweek number.
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
