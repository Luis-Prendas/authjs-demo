import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { IconLink } from "@tabler/icons-react";
import CurrentRole from "./components/current-role";
import SignOut from "./components/sign-out";
import { auth } from "@/auth";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Demo",
  description: "Demostración de inicio y cierre de sesión con nombre de usuario y contraseña, utilizando roles y permisos en Next.js y Auth.js con TypeScript.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <html lang="es" suppressHydrationWarning>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <body className={`${inter.className} w-full h-full grid grid-cols-[repeat(12,_1fr)] grid-rows-[repeat(12,_1fr)] gap-x-[0px] gap-y-[0px]`}>
            <header className='[grid-area:1_/_1_/_2_/_13] grid grid-cols-[repeat(3,_1fr)] grid-rows-[1fr] p-4'>
              <section className="[grid-area:1_/_1_/_2_/_2] flex justify-start items-center">
                {session && <CurrentRole />}
              </section>
              <section className="[grid-area:1_/_2_/_2_/_3] flex justify-center items-center gap-4">
                <Link className="flex justify-center items-center text-lg font-semibold" href='/'><IconLink />Inicio</Link>
                <Link className="flex justify-center items-center text-lg font-semibold" href='/dashboard'><IconLink />Panel</Link>
                <Link className="flex justify-center items-center text-lg font-semibold" href='/other-public'><IconLink />Ruta pública</Link>
                {!session && <Link className="flex justify-center items-center text-lg font-semibold" href='/signin'><IconLink />Iniciar sesión</Link>}
              </section>
              <section className="[grid-area:1_/_3_/_2_/_4] flex justify-end items-center gap-4">
                <ModeToggle />
                {session && <SignOut />}
              </section>
            </header>
            <div className="[grid-area:2_/_1_/_13_/_13] bg-gray-100 dark:bg-slate-900">
              <h1 className="absolute bottom-4 right-4 text-2xl font-bold flex justify-center items-center gap-3 opacity-50 hover:opacity-100 transition">
                Desarrollado por Luis Daniel Prendas
              </h1>
              {children}
            </div>
          </body>
        </ThemeProvider>
      </SessionProvider>
    </html>
  );
}
