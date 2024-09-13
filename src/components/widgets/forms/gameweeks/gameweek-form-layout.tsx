import { Form } from "~/components/entities/command/form";
import { CloseButton } from "~/components/entities/close-button";
import { InputForm } from "~/components/entities/input-form";
import { SubmitButton } from "~/components/entities/submit-button";

import { gameweekSchema } from "../schemas";

import type { z } from "zod";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

type Props = {
  isFoundation?: boolean;
  setIsFoundation?: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      number: number;
    },
    unknown,
    undefined
  >;

  onSubmit: (values: z.infer<typeof gameweekSchema>) => void;
  onInvalid: () => void;
};

export const GameweekFormLayout = ({
  toggle,
  form,
  setToggle,
  onSubmit,
  onInvalid,
}: Props) => {
  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 z-20 mt-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-black shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="relative flex max-w-[400px] flex-col gap-4"
        >
          <CloseButton closeClick={() => setToggle(false)} />

          <InputForm
            form={form}
            name="number"
            label="Gameweek"
            placeholder="Ex: 8"
            description="Write down gameweek number."
            className="mt-4"
            onChange={(e) => {
              form.setValue("number", Number(e.target.value));
            }}
          />

          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
