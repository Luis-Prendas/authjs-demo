import { IconHome, IconLink } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 w-full h-full">
      <h1 className="text-3xl font-bold flex justify-center items-center gap-2"><IconHome/>HOME PAGE</h1>
    </main>
  );  
}
