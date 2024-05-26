'use client'
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button onClick={() => signOut()}><IconLogout className="h-8 w-8" /></button>
  )
}