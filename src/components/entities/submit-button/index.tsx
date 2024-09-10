import { Button } from "~/components/shared/ui";

export const SubmitButton = () => {
  return (
    <div className="w-[200px]">
      <Button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </Button>
    </div>
  );
};
