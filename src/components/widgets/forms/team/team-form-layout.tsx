import { Form } from "~/components/entities/command/ui/form";
import { InputForm } from "~/components/entities/input-form";
import { SubmitButton } from "~/components/entities/submit-button";

import type { UseFormReturn } from "react-hook-form";
import type { teamSchema } from "../schemas";
import type { z } from "zod";
import { CloseButton } from "~/components/entities/close-button";
import { ImageUploadForm } from "~/components/entities/image-upload-form";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      name: string;
      image: string;
    },
    unknown,
    undefined
  >;
  onSubmit: (values: z.infer<typeof teamSchema>) => void;
  onInvalid: () => void;
};

export const TeamFormLayout = ({ form, onSubmit, setToggle }: Props) => {
  return (
    <div
      className={
        "flex max-w-5xl flex-col gap-4 rounded-lg shadow-lg  md:w-1/2 lg:w-1/4"
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex flex-col gap-4"
        >
          <CloseButton closeClick={() => setToggle(false)} />

          <InputForm
            name={"name"}
            onChange={undefined}
            form={form}
            label={"Team Name"}
            placeholder={"ex: NUFYP"}
            description={"Please write team name"}
            className="mt-4"
          />

          <ImageUploadForm
            form={form}
            name={"image"}
            label={"Team Image"}
            endpoint={"teamImage"}
            description={"Please upload image of the team"}
          />

          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
