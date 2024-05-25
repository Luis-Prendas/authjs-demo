import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { IconLink } from "@tabler/icons-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <SessionProvider>
        <body className={`${inter.className} w-full h-full grid grid-cols-[repeat(12,_1fr)] grid-rows-[repeat(12,_1fr)] gap-x-[0px] gap-y-[0px]`}>
          <header className="[grid-area:1_/_1_/_2_/_13] flex gap-4 justify-center items-center">
            <Link className="flex justify-center items-center text-lg font-semibold" href='/'><IconLink />Home</Link>
            <Link className="flex justify-center items-center text-lg font-semibold" href='/signin'><IconLink />SignIn</Link>
            <Link className="flex justify-center items-center text-lg font-semibold" href='/dashboard'><IconLink />Dashboard</Link>
            <Link className="flex justify-center items-center text-lg font-semibold" href='/other-public'><IconLink />Other public</Link>
          </header>
          <div className="[grid-area:2_/_1_/_13_/_13]">
            {children}
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
