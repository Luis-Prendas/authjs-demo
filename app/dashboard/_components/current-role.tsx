
import { auth } from "@/auth"

export default async function CurrentRole() {
  const session = await auth()
  return (
      <span className="px-4 py-2 bg-green-700 text-green-300 rounded absolute top-4 left-4">Role: {session?.user.role}</span>
  )
}