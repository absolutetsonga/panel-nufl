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
  isHidden?: boolean;
};

type Props = {
  itemValues: itemValue[];
  placeholder: string;
  onValueChange: (...event: unknown[]) => void;
  defaultValue: string | undefined;
};

export const SelectForm = ({
  itemValues,
  placeholder,
  onValueChange,
  defaultValue,
}: Props) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="bg-black ">
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
