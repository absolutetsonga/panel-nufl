import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { useCreatePlayer } from "~/components/shared/lib/hooks/player";
import { useState } from "react";
import { toast } from "sonner";
import { playerSchema } from "../schemas";
import { PlayerFormLayout } from "./player-form-layout";

type Props = {
  team_id: number;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerCreateForm = ({ team_id, toggle, setToggle }: Props) => {
  const { mutate: server_createTeam } = useCreatePlayer();
  const [isFoundation, setIsFoundation] = useState(true);

  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
  });

  function onSubmit(values: z.infer<typeof playerSchema>) {
    const number_year = Number(values.year);
    if (Number.isNaN(number_year)) {
      toast("Course year must be integer");
      return null;
    }

    server_createTeam({ ...values, team_id, year: number_year });
    setToggle(false);
  }

  function onInvalid() {
    console.error(form.formState.errors);
  }

  if (!toggle) return <></>;

  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 z-20 w-full bg-black mt-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-black shadow-lg">
      <PlayerFormLayout
        isFoundation={isFoundation}
        setIsFoundation={setIsFoundation}
        toggle={toggle}
        setToggle={setToggle}
        form={form}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
      />
    </div>
  );
};
