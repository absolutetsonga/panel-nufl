import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateGameweek } from "~/components/shared/lib/hooks/gameweeks";

import { Form } from "~/components/entities/command/ui/form";
import { InputForm } from "~/components/entities/input-form";
import { CloseButton } from "~/components/entities/close-button";
import { SubmitButton } from "~/components/entities/submit-button";

import { gameweekSchema } from "../schemas";
import type { z } from "zod";

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
