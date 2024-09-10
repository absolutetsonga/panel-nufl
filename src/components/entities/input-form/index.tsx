import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "~/components/entities/command/ui/form";
import { Input } from "~/components/shared/ui";

type InputFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  description: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export const InputForm = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  onChange,
}: InputFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-slate-50">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
              className="rounded-md bg-black focus:border-indigo-500 focus:ring-indigo-500"
            />
          </FormControl>
          <FormDescription className="text-[14px] text-slate-300">
            {description}
          </FormDescription>
          <FormMessage className="mt-2 text-[12px] text-red-600" />
        </FormItem>
      )}
    />
  );
};
