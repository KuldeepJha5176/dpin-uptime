"use client"

import { ThemeToggle } from "@/components/theme-toggle";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useClerk
} from '@clerk/nextjs'
import { Button } from "./ui/button";

export default function Appbar() {
  const { signOut } = useClerk();
  
  return (
    <div className='flex justify-between items-center p-4 border-b'>
      <div className="font-bold text-lg">
        Dpin Uptime
      </div>
      <div className="flex items-center gap-4">
        < ThemeToggle />
        <SignedOut>
          <SignInButton mode="modal">
            < Button variant="default" size="default">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            < Button variant="default" size="default">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/dashboard" />
        </SignedIn>
      </div>
    </div>
  )
}