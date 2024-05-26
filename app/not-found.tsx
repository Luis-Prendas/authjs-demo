import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 w-full h-full">
      <h2 className="text-3xl px-4 py-2 text-yellow-700 bg-yellow-300 rounded">No Found...</h2>
      <Image className="rounded" alt="Not found" src='https://media1.tenor.com/m/HYBKG4ZNb5AAAAAC/everything-is-fine-itsfine.gif' width={400} height={200} />
    </main>
  )
}