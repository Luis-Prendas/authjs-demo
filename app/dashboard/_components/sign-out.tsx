'use client'
import { signOut } from "next-auth/react";

export default function SignOut () {
  return (
    <button className="absolute top-4 right-4" onClick={() => signOut()}>SugnOut</button>
  )
}