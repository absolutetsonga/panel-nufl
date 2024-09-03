import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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
    <div className={`px-4 py-10 w-[92px] sm:w-[300px]`}>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="flex h-full flex-col">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <img
              src={
                "https://utfs.io/f/10eeb70a-84b1-4991-9621-0d2fdacd5ef4-hru0oc.png"
              }
              width={60}
              height={60}
              alt="NUFL Logo"
              className="h-[60px] w-[60px]"
            />
            <h1 className="text-[20px] font-bold text-center">NUFL Panel</h1>
          </div>
          <Command className="flex flex-1 grow pt-6">
            <CommandList>
              <div className="flex flex-row flex-col gap-3 sm:gap-1">
                {COMMANDS.map((command) => (
                  <Link
                    href={"/" + command.id}
                    key={command.id}
                    className="flex flex-row items-center justify-center sm:justify-normal gap-1 rounded-xl px-2 py-0.5 transition ease-in-out hover:bg-[#8c6c34]/45"
                  >
                    {command.icon}
                    <CommandItem className="hidden text-[16px] sm:block">
                      {command.name}
                    </CommandItem>
                  </Link>
                ))}
              </div>
            </CommandList>
          </Command>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Menubar;
