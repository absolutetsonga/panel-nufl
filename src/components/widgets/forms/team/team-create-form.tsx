import { useForm } from "react-hook-form";
import { useCreateTeam } from "~/components/shared/lib/hooks/team";

import { zodResolver } from "@hookform/resolvers/zod";
import { TeamFormLayout } from "./team-form-layout";
import { teamSchema } from "../schemas";

import type { Dispatch, SetStateAction } from "react";
import type { z } from "zod";

type Props = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
};

export const TeamCreateForm = ({ toggle, setToggle }: Props) => {
  const { mutate: server_createTeam } = useCreateTeam();

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof teamSchema>) {
    server_createTeam(values);
    setToggle(false);
  }

  function onInvalid() {
    console.error(form.formState.errors);
  }

  if (!toggle) return <></>;

  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 z-20 w-full mt-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-black shadow-lg">
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
