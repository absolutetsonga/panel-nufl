import React from "react";
import type { FieldValues, FieldPath, UseFormReturn } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "~/components/entities/command/ui/form";
import { Input } from "~/components/shared/ui";

type FormFieldProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  renderInput?: (field: unknown) => React.ReactNode;
};

export const CustomFormField = <TFieldValues extends FieldValues>({
  form,
  name,
  label,
  type,
  placeholder,
  description,
  renderInput,
}: FormFieldProps<TFieldValues>) => {
  return (
    <FormItem>
      <FormLabel className="text-sm font-medium text-gray-700">
        {label}
      </FormLabel>
      <FormControl>
        {renderInput ? (
          renderInput(form.getFieldState(name))
        ) : (
          <Input
            type={type}
            placeholder={placeholder}
            {...form.register(name)}
            className="rounded-md focus:border-indigo-500 focus:ring-indigo-500"
          />
        )}
      </FormControl>
      {description && (
        <FormDescription className="text-[14px] text-gray-500">
          {description}
        </FormDescription>
      )}
      <FormMessage className="mt-2 text-[12px] text-red-600" />
    </FormItem>
  );
};
