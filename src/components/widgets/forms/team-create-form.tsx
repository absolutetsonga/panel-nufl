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
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";

import Image from "next/image";
import { XIcon } from "lucide-react";

import { useCreateTeam } from "~/components/shared/lib/hooks/team";
import { teamSchema } from "./schemas";
import { toast } from "sonner";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeamCreateForm = ({ toggle, setToggle }: Props) => {
  const { mutate: server_createTeam } = useCreateTeam();

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof teamSchema>) {
    server_createTeam(values);
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
            className="absolute right-2 top-2 p-1 text-slate-200 hover:text-white"
          >
            <XIcon />
          </Button>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white">
                  Team Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Team Name"
                    {...field}
                    className="rounded-md text-black focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormDescription className="text-[14px] text-slate-200">
                  Write down team name.
                </FormDescription>
                <FormMessage className="mt-2 text-[12px] text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white">
                  Team Image
                </FormLabel>
                <FormControl>
                  <UploadButton
                    className="max-w-min"
                    endpoint="teamImage"
                    onClientUploadComplete={(res) => {
                      form.setValue("image", res[0]?.url ?? "");
                      toast("You successfully uploaded image");
                    }}
                    onUploadError={(error: Error) => {
                      console.log(error);
                      toast("Something went wrong. Check logs.");
                    }}
                  />
                </FormControl>
                {field.value && (
                  <div className="mt-4 w-full items-center justify-center">
                    <Image
                      src={field.value}
                      alt="Uploaded Team Logo"
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full border-2 border-gray-300 object-cover"
                    />
                  </div>
                )}
                <FormDescription className="text-[14px] text-slate-200">
                  Upload here team logo.
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
