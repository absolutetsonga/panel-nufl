import { Button } from "~/components/shared/ui";
import { PlusIcon } from "lucide-react";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

export const CreateButton = ({ toggle, setToggle, className }: Props) => {
  return (
    <Button onClick={() => setToggle(!toggle)} className={className}>
      <PlusIcon />
    </Button>
  );
};
