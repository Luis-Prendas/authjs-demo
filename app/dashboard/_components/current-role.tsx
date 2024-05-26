
import { auth } from "@/auth"

export default async function CurrentRole() {
  const session = await auth()
  return (
      <span className="px-4 py-2 bg-green-300 text-green-700 rounded">Role: {session?.user.role}</span>
  )
}