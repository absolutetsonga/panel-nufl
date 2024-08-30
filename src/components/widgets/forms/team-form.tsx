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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  image: z.string().url({
    message: "Please upload a valid team image URL.",
  }),
});

export const TeamForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div><Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border-2 border-gray-400 p-4 rounded-xl">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Name</FormLabel>
            <FormControl>
              <Input placeholder="Team Name" {...field} />
            </FormControl>
            <FormDescription>Write down team name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Image</FormLabel>
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
              <div className="mt-4">
                <Image
                  src={field.value}
                  alt="Uploaded Team Logo"
                  width={96}
                  height={96}
                  className="h-24 w-24 object-cover"
                />
              </div>
            )}
            <FormDescription>Upload here team logo.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form></div>
    
  );
};
