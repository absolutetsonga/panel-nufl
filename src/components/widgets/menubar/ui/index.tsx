import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/shared/lib/utils/uploadthing";

const Menubar = () => {
  return (
    <div className="flex flex-col border-r-2 border-gray-400 p-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UploadButton endpoint="teamImage" />
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Menubar;
