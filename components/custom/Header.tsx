"use client";

import { useRouter } from "next/navigation";
import { FileHeart } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  const router = useRouter();

  return (
    <div className="py-8 px-20 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FileHeart width={32} height={32} />
        <h1 className="text-xl">Link Keeper</h1>
      </div>
      <div className="flex items-center gap-2">
        {/* Show sign in button if the user is not authenticated */}
        <SignedOut>
          {/* Wrap your custom button with SignInButton for modal functionality */}
          <SignInButton mode="modal">
            <Button variant="ghost" className="text-xl">
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>

        {/* Show the user button if the user is signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        <Button
          variant="ghost"
          className="text-xl"
          onClick={() => router.push("/links")}
        >
          My Links
        </Button>
      </div>
    </div>
  );
};

export default Header;
