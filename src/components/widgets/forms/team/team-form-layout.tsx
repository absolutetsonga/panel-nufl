import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/entities/command/ui/form";

import { InputForm } from "~/components/entities/input-form";
import { SubmitButton } from "~/components/entities/submit-button";
import { Button } from "~/components/shared/ui";
import { XIcon } from "lucide-react";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";
import { toast } from "sonner";
import Image from "next/image";

import type { UseFormReturn } from "react-hook-form";
import type { teamSchema } from "../schemas";
import type { z } from "zod";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      name: string;
      image: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof teamSchema>) => void;
  onInvalid: () => void;
};

export const TeamFormLayout = ({ form, onSubmit, setToggle }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-4 md:w-1/2 lg:w-1/4"
      >
        <Button
          onClick={() => setToggle(false)}
          className="absolute -top-6 right-0 text-slate-300 hover:text-slate-50"
        >
          <XIcon />
        </Button>

        <InputForm
          name={"name"}
          onChange={undefined}
          form={form}
          label={"Team Name"}
          placeholder={"ex: NUFYP"}
          description={"Please write team name"}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="max-w-min">
              <FormLabel className="text-sm font-medium text-slate-50">
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

        <SubmitButton />
      </form>
    </Form>
  );
};
