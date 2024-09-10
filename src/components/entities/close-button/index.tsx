import { XIcon } from "lucide-react";
import { Button } from "~/components/shared/ui";

type CloseButtonProps = {
  closeClick: () => void;
};

export const CloseButton = ({ closeClick }: CloseButtonProps) => {
  return (
    <Button
      onClick={closeClick}
      className="absolute right-2 top-2 p-1 text-slate-300 hover:text-slate-50"
    >
      <XIcon />
    </Button>
  );
};
