import { IconBrandGithub, IconBrandLinkedin, IconHome, IconWorldWww } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 pb-80 w-full h-full">
      <h2 className="text-3xl font-bold flex justify-center items-center gap-1">
        <IconHome className="w-7 h-7" />
        Inicio
      </h2>
      <span className="flex justify-center items-center gap-2 text-green-700 bg-green-200 px-4 py-2 rounded">
        Desarrollado con Next.js + Auth.js
      </span>
      <p className="w-[450px] text-center p-4 bg-gray-300 rounded">
        Demostración de inicio y cierre de sesión con nombre de usuario y contraseña, utilizando roles y permisos en Next.js y Auth.js con TypeScript.
      </p>
      <ul className="flex justify-center items-center">
        <li className="hover:bg-zinc-300 rounded-full p-2 transition opacity-40 hover:opacity-100">
          <Link href="https://www.linkedin.com/in/luisprendasdev/" target="_blank">
            <IconBrandLinkedin />
          </Link>
        </li>
        <li className="hover:bg-zinc-300 rounded-full p-2 transition opacity-40 hover:opacity-100">
          <Link href="https://github.com/Luis-Prendas/authjs-demo/" target="_blank">
            <IconBrandGithub />
          </Link>
        </li>
        <li className="hover:bg-zinc-300 rounded-full p-2 transition opacity-40 hover:opacity-100">
          <Link href="https://porfolio-luis-prendas.vercel.app/" target="_blank">
            <IconWorldWww />
          </Link>
        </li>
      </ul>
    </main>
  );
}
