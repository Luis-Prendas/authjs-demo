import { auth } from "@/auth";
import { IconLicense } from "@tabler/icons-react";
import LicensesTable from "../_components/licenses-table";

export default async function Page() {
  const session = await auth()

  if (!session) return <span>Cargando...</span>

  if (session.user.role !== 'super-admin') return <span>No tienes acceso...</span>
  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 w-full h-full">
      <h1 className="text-3xl font-bold flex justify-center items-center gap-2"><IconLicense />EDITOR DE LICENSIAS</h1>
      <LicensesTable />
    </main>
  )
}