import { SubmitButton } from "~/components/entities/submit-button";
import { CloseButton } from "~/components/entities/close-button";
import { InputForm } from "~/components/entities/input-form";
import { Form } from "~/components/entities/command/form";

import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { tournamentSchema } from "../schemas";
import type { z } from "zod";

type Props = {
  isFoundation?: boolean;
  setIsFoundation?: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      name: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;

  onSubmit: (values: z.infer<typeof tournamentSchema>) => void;
  onInvalid: () => void;
};

export const TournamentFormLayout = ({
  form,
  onSubmit,
  onInvalid,
  setToggle,
}: Props) => {
  return (
    <div className={"flex max-w-5xl flex-col gap-4 rounded-lg p-6 shadow-lg"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className={"relative flex w-full flex-col gap-4"}
        >
          <CloseButton closeClick={() => setToggle(false)} />

          <InputForm
            form={form}
            name={"name"}
            placeholder={"Tournament Name"}
            label={"Tournament Name"}
            description={"Write down tournament name."}
            className="mt-4"
          />

          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
