import type { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "~/components/entities/command/ui/form";
import { Input } from "~/components/shared/ui";

type Props = {
    form: UseFormReturn<{
        date: Date;
        home_team_id: number;
        away_team_id: number;
        venue: string;
        match_report: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, any, undefined>
    label: string;
    placeholder: string
}
export const InputForm = ({form, label, placeholder}: Props) => {
    return (
        <FormField
          control={form.control}
          name="match_report"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-50">
                {label}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  {...field}
                  className="rounded-md bg-black focus:border-indigo-500 focus:ring-indigo-500"
                />
              </FormControl>
              <FormMessage className="mt-2 text-[12px] text-red-600" />
            </FormItem>
          )}
        />
    )
}