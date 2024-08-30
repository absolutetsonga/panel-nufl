import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";
import {
  Command,
  CommandItem,
  CommandList,
} from "~/components/entities/command/ui/command";
import { COMMANDS } from "~/components/entities/command/constants";
import Link from "next/link";

const Menubar = () => {
  return (
    <div className="flex flex-col border-r-2 border-gray-400 p-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Command>
          <CommandList>
            {COMMANDS.map((command) => (
              <Link href={"/" + command.id} key={command.id}>
                <CommandItem>{command.name}</CommandItem>
              </Link>
            ))}
          </CommandList>
        </Command>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Menubar;
