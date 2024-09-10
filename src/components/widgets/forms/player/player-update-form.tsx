import { useForm } from "react-hook-form";
import { useUpdatePlayer } from "~/components/shared/lib/hooks/player";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { playerSchema } from "../schemas";
import { PlayerFormLayout } from "./player-form-layout";
import { useState } from "react";

type Props = {
  player: {
    id: number;
    team_id: number;
    fullname: string;
    image: string;
    position: string;
    level_of_study: string;
    school: string;
    age: Date;
    year: number;
  };
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerUpdateForm = ({ player, toggle, setToggle }: Props) => {
  const { mutate: server_updateTeam } = useUpdatePlayer();
  const [isFoundation, setIsFoundation] = useState(
    player.level_of_study === "FOUND",
  );

  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      fullname: player.fullname,
      image: player.image,
      position: player.position,
      school: player.school,
      level_of_study: player.level_of_study,
      year: player.year,
      age: player.age,
    },
  });

  function onSubmit(values: z.infer<typeof playerSchema>) {
    const number_year = Number(values.year);

    if (Number.isNaN(number_year)) {
      toast("Course year must be integer");
      return null;
    }

    server_updateTeam({
      player: {
        ...values,
        id: player.id,
        team_id: player.team_id,
        year: number_year,
      },
    });
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
