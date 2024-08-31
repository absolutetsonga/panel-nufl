import { Button } from "~/components/shared/ui";
import { PlusIcon } from "lucide-react";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateButton = ({ toggle, setToggle }: Props) => {
  return (
    <Button onClick={() => setToggle(!toggle)}>
      <PlusIcon />
    </Button>
  );
};
