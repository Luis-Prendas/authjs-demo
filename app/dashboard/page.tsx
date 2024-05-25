import { IconDashboard } from "@tabler/icons-react";
import Options from "./_components/options";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth()

  if(!session) return <span>Cargando...</span>

  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 w-full h-full">
      <h1 className="text-3xl font-bold flex justify-center items-center gap-2"><IconDashboard />DASHBOARD</h1>
      <Options sessionRole={session.user.role} />
    </main>
  )
}

