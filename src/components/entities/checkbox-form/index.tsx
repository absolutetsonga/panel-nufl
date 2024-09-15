import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/entities/command/form";
import { Checkbox } from "~/components/shared/ui";

import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type CheckboxFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  className?: string;
};

export const CheckboxForm = <T extends FieldValues>({
  form,
  name,
  label,
  className,
}: CheckboxFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
          </div>
          <FormMessage className="mt-2 text-[12px] text-red-600" />
        </FormItem>
      )}
    />
  );
};
