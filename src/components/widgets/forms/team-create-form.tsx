import { useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  image: z.string().url({
    message: "Please upload a valid team image URL.",
  }),
});

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeamCreateForm = ({ toggle, setToggle }: Props) => {
  const { mutate: server_createTeam } = useCreateTeam();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    server_createTeam(values);
    setToggle(false);
  }

  if (!toggle) return <></>;

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-black p-8 shadow-lg md:p-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-8 rounded-xl border-2 border-gray-200 bg-gray-50 p-6 md:p-8"
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
                  Team Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Team Name"
                    {...field}
                    className="rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormDescription className="text-[14px] text-slate-300">
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
                <FormLabel className="text-sm font-medium text-slate-50">
                  Team Image
                </FormLabel>
                <FormControl>
                  <UploadButton
                    endpoint="teamImage"
                    onClientUploadComplete={(res) => {
                      form.setValue("image", res[0]?.url ?? "");
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
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
                <FormDescription className="text-[14px] text-slate-300">
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
