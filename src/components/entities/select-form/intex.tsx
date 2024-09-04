import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shared/ui/select";
import { FormControl } from "~/components/entities/command/ui/form";

type itemValue = {
  value: string;
  name: string;
  isHidden: boolean;
};

type Props = {
  itemValues: itemValue[];
  onValueChange: (...event: unknown[]) => void;
  defaultValue: string | undefined;
  disabled?: boolean;
};

export const SelectForm = ({
  itemValues,
  onValueChange,
  defaultValue,
  disabled = false,
}: Props) => {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select player position" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="bg-black">
        {itemValues.map((iv) => (
          <SelectItem
            key={iv.name}
            value={iv.value}
            className={`${iv.isHidden ? "hidden" : "block"}`}
          >
            {iv.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
