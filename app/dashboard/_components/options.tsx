'use client'
import { License, useLicensesStore } from "@/stores/useStore";
import Link from "next/link";
import { useState } from "react";

interface Props {
  sessionRole: string
}

export default function Options({ sessionRole }: Props) {
  const { getLicenses } = useLicensesStore()
  const [license, setLicense] = useState<License | null>(getLicenses(sessionRole))

  return (
    <>
      {license ? (
        <ul className="flex flex-col gap-4 justify-center items-center">
          {license.licenses.transacciones && (
            <li>Transacciones</li>
          )}
          {license.licenses.depositos && (
            <li>Depositos</li>
          )}
          {license.licenses.retiros && (
            <li>Retiros</li>
          )}
          {license.licenses.editLicenses && (
            <li>
              <Link href='/dashboard/edit-license'>Editar Licensias</Link>
            </li>
          )}
        </ul>
      ) : (
        <span>Cargando...</span>
      )}
    </>
  )
}
