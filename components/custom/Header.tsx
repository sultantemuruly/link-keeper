"use client";

import { useRouter, usePathname } from "next/navigation";
import { FileHeart, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="py-8 px-10 md:px-20 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FileHeart
          width={32}
          height={32}
          className="min-w-[26px] flex-shrink-0"
        />
        <h1 className="text-md md:text-xl">Link Keeper</h1>
      </div>
      <div className="flex items-center gap-2">
        {pathname === "/links" ? (
          <Button
            variant="ghost"
            className="text-xl"
            onClick={() => router.push("/")}
          >
            <ChevronLeft strokeWidth={3} />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="text-md md:text-xl"
            onClick={() => router.push("/links")}
          >
            My Links
          </Button>
        )}

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
      </div>
    </div>
  );
};

export default Header;
