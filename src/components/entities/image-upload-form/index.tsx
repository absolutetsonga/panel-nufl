import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/entities/command/form";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";
import { toast } from "sonner";
import Image from "next/image";

type ImageUploadFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  endpoint: "teamImage" | "playerImage";
  description: string;
  className?: string;
};

export const ImageUploadForm = <T extends FieldValues>({
  form,
  name,
  label,
  endpoint,
  description,
  className,
}: ImageUploadFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${className} max-w-min`}>
          <FormLabel className="text-sm font-medium text-slate-50">
            {label}
          </FormLabel>
          <FormControl>
            <UploadButton
              className="max-w-min"
              endpoint={endpoint}
              onClientUploadComplete={(res) => {
                const newImageUrl: string = res[0]?.url ?? "";
                form.setValue(name, newImageUrl as PathValue<T, Path<T>>);
                toast.success("You successfully uploaded image");
              }}
              onUploadError={(error: Error) => {
                console.log(error);
                toast.error("Something went wrong. Check logs.");
              }}
            />
          </FormControl>
          {field.value && (
            <div className="mt-4 w-full items-center justify-center">
              <Image
                src={field.value}
                alt={`Image of the ${field.name}`}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full border-2 border-gray-300 object-cover"
              />
            </div>
          )}
          <FormDescription className="text-[14px] text-slate-200">
            {description}
          </FormDescription>
          <FormMessage className="mt-2 text-[12px] text-red-600" />
        </FormItem>
      )}
    />
  );
};
