import { PencilIcon, Trash2Icon, XIcon } from "lucide-react";

type TeamActionsProps = {
  isEditing: boolean;
  onEditToggle: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteToggle: () => void;
};

export const TeamActions = ({
  isEditing,
  onEditToggle,
  onDeleteToggle,
}: TeamActionsProps) => (
  <div className="flex flex-row items-center justify-between gap-2 px-4 py-2">
    {isEditing ? (
      <XIcon
        className="h-6 w-6 cursor-pointer"
        onClick={() => onEditToggle(false)}
      />
    ) : (
      <PencilIcon
        className="h-6 w-6 cursor-pointer"
        onClick={() => onEditToggle(true)}
      />
    )}
    <Trash2Icon className="h-6 w-6 cursor-pointer" onClick={onDeleteToggle} />
  </div>
);
