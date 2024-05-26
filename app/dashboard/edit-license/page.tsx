import { auth } from "@/auth";
import { IconLicense } from "@tabler/icons-react";
import LicensesTable from "../_components/licenses-table";

export default async function Page() {
  const session = await auth()

  if (!session) return <span>Cargando...</span>

  if (session.user.access.role !== 'super-admin') return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 w-full h-full pb-80">
      <span>No tienes acceso...</span>
    </main>
  )

  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 w-full h-full pb-80">
      <h1 className="text-3xl font-bold flex justify-center items-center gap-2"><IconLicense />Editor de licencias</h1>
      <LicensesTable />
    </main>
  )
}