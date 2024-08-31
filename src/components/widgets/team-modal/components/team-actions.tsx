import { PencilIcon, Trash2Icon, XIcon, ArrowUpIcon } from "lucide-react";

type TeamActionsProps = {
  isEditing: boolean;
  onEditToggle: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteToggle: () => void;
  onRedirect: () => void;
};

export const TeamActions = ({
  isEditing,
  onEditToggle,
  onDeleteToggle,
  onRedirect,
}: TeamActionsProps) => (
  <div className="flex h-full w-1/5 flex-col items-center justify-between gap-4 px-4 py-2">
    {isEditing ? (
      <XIcon className="h-6 w-6 cursor-pointer" onClick={() => onEditToggle(false)} />
    ) : (
      <PencilIcon className="h-6 w-6 cursor-pointer" onClick={() => onEditToggle(true)} />
    )}
    <Trash2Icon className="h-6 w-6 cursor-pointer" onClick={onDeleteToggle} />
    <ArrowUpIcon className="h-6 w-6 cursor-pointer" onClick={onRedirect} />
  </div>
);
