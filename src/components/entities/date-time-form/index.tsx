import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../command/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/shared/ui/popover";

import { Button } from "~/components/shared/ui";
import { Calendar } from "~/components/shared/ui/calendar";
import { TimePickerDemo } from "~/components/widgets/time-picker";
import { CalendarIcon } from "lucide-react";

import { cn } from "~/components/shared/lib/utils/clsx";
import { format } from "date-fns";

type DateTimeProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  description: string;
  fromDate: Date;
  toDate: Date;
  withTimePicker?: boolean;
  className?: string;
};

export const DateTimeForm = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder,
  fromDate,
  toDate,
  className,
  withTimePicker = false,
}: DateTimeProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-left">{label}</FormLabel>
          <Popover>
            <FormControl>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP HH:mm:ss")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
            </FormControl>
            <PopoverContent className="w-auto bg-white p-0 text-black">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                fromDate={fromDate}
                toDate={toDate}
                initialFocus
              />
              {withTimePicker && (
                <div className="border-border border-t p-3">
                  <TimePickerDemo setDate={field.onChange} date={field.value} />
                </div>
              )}
            </PopoverContent>
          </Popover>
          <FormDescription className={"text-[14px] text-slate-300"}>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
