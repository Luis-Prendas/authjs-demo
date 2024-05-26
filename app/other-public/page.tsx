import { IconAppWindow, IconLink } from "@tabler/icons-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 w-full h-full pb-80">
      <h1 className="text-3xl font-bold flex justify-center items-center gap-2"><IconAppWindow className="w-7 h-7" />Ruta pública</h1>
    </main>
  )
}