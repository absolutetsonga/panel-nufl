import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "~/components/entities/command/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shared/ui";

type itemValue = {
  value: string;
  name: string;
  isHidden?: boolean;
};

type SelectFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  itemValues: itemValue[];
  placeholder: string;
  description: string;
  className?: string;
  onValueChange?: (...event: unknown[]) => void;
};

export const SelectForm = <T extends FieldValues>({
  form,
  name,
  label,
  className,
  itemValues,
  placeholder,
  description,
  onValueChange,
}: SelectFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onValueChange?.(value);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-black ">
              {itemValues.map((iv) => (
                <SelectItem
                  key={iv.value}
                  value={iv.value}
                  className={`${iv.isHidden ? "hidden" : "block"}`}
                >
                  {iv.name}
                </SelectItem>
              ))}
            </SelectContent>
            <FormDescription className="text-[14px] text-slate-300">
              {description}
            </FormDescription>
            <FormMessage className="mt-2 text-[12px] text-red-600" />
          </Select>
        </FormItem>
      )}
    ></FormField>
  );
};
