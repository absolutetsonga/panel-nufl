import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TeamFormLayout } from "./team-form-layout";
import { useUpdateTeam } from "~/components/shared/lib/hooks/team";

import type { z } from "zod";
import type { Dispatch, SetStateAction } from "react";

import { teamSchema } from "../schemas";

type Props = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  team: { id: number; name: string | null; image: string | null };
};

export const TeamUpdateForm = ({ toggle, setToggle, team }: Props) => {
  const { mutate: server_updateTeam } = useUpdateTeam();

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team.name ?? "",
      image: team.image ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof teamSchema>) {
    server_updateTeam({ id: team.id, name: values.name, image: values.image });
    setToggle(false);
  }

  function onInvalid() {
    console.error(form.formState.errors);
  }

  if (!toggle) return <></>;

  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 z-20 w-full bg-black mt-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-black shadow-lg">
      <TeamFormLayout
        toggle={toggle}
        setToggle={setToggle}
        form={form}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
      />
    </div>
  );
};
