'use client'
import { License } from "@/lib/users";
import { useLicensesStore } from "@/stores/useStore";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface Props {
  userId: string
}

export default function Options({ userId }: Props) {
  const { getLicenses } = useLicensesStore()
  const [licenses] = useState(getLicenses(userId))

  return (
    <>
      {licenses ? (
        <ul className="flex flex-col gap-4 justify-center items-center p-4 rounded border border-gray-300 dark:bg-slate-800 dark:border-slate-600 bg-white">
          {licenses.map(license => (
            <li key={license.licenseName} className="w-44">
              <Link href={license.route}>
                <HoverCard>
                  <HoverCardTrigger className="flex justify-start items-center w-full"><IconChevronRight />{license.displayName}</HoverCardTrigger>
                  <HoverCardContent className="text-center">
                    {license.description}
                  </HoverCardContent>
                </HoverCard>
              </Link>
            </li>
          ))}
        </ul >
      ) : (
        <span>No tienes licencias...</span>
      )
      }
    </>
  )
}
