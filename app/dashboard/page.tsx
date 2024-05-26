import { IconDashboard } from "@tabler/icons-react";
import Options from "./_components/options";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth()

  if(!session) return <span>Cargando...</span>

  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 pb-80 w-full h-full">
      <h1 className="text-3xl font-bold flex justify-center items-center gap-2"><IconDashboard className="w-7 h-7" />Panel</h1>
      <Options userId={session.user.id!} />
    </main>
  )
}

