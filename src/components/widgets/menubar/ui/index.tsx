import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";
import { Heading4 } from "~/components/shared/ui/typography";
import {
  Command,
  CommandItem,
  CommandList,
} from "~/components/entities/command/ui/command";
import { COMMANDS } from "~/components/entities/command/constants";
import Link from "next/link";

const Menubar = () => {
  return (
    <div
      className={`absolute left-1/2 top-4 flex h-24 w-24 min-w-[80%] -translate-x-1/2 transform flex-row items-center justify-between rounded-xl border-2 border-violet-900 bg-white p-4 transition-transform duration-300 ease-in-out sm:left-4 sm:top-1/2 sm:h-24 sm:min-h-[400px] sm:min-w-[20px] sm:-translate-x-0 sm:-translate-y-1/2 sm:flex-col`}
    >
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Heading4>Panel</Heading4>
        <Command className="flex items-center justify-center">
          <CommandList>
            <div className="flex flex-row sm:flex-col">
              {COMMANDS.map((command) => (
                <Link href={"/" + command.id} key={command.id}>
                  <CommandItem className="text-center text-[16px]">
                    {command.name}
                  </CommandItem>
                </Link>
              ))}
            </div>
          </CommandList>
        </Command>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Menubar;
