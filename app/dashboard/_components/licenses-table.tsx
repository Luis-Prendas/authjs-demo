'use client'
import { License, useLicensesStore } from "@/stores/useStore"
import { useState } from "react";
import Select, { MultiValue } from 'react-select';

export default function LicensesTable() {
  const { licenses, updateLicenses } = useLicensesStore()

  const [licensesUsers, setLicensesUsers] = useState<License[]>([])

  const options = Object.keys(licenses[0].licenses).map(license => {
    return {
      label: license,
      value: license,
    };
  });

  const handleChange = (selectedOptions: MultiValue<{ label: string, value: string }>, index: number) => {
    let role: string;

    if (index === 1) {
      role = 'user';
    } else if (index === 2) {
      role = 'admin';
    } else if (index === 3) {
      role = 'super-admin';
    } else {
      return;
    }

    const existingFormatIndex = licensesUsers.findIndex(format => format.role === role);

    if (existingFormatIndex !== -1) {
      const updatedFormat = {
        ...licensesUsers[existingFormatIndex],
        licenses: {
          transacciones: selectedOptions.find(e => e.label === 'transacciones') ? true : false,
          depositos: selectedOptions.find(e => e.label === 'depositos') ? true : false,
          retiros: selectedOptions.find(e => e.label === 'retiros') ? true : false,
          editLicenses: selectedOptions.find(e => e.label === 'editLicenses') ? true : false
        }
      };

      setLicensesUsers(prev => [
        ...prev.slice(0, existingFormatIndex),
        updatedFormat,
        ...prev.slice(existingFormatIndex + 1)
      ]);
    } else {
      const newFormat: License = {
        role,
        licenses: {
          transacciones: selectedOptions.find(e => e.label === 'transacciones') ? true : false,
          depositos: selectedOptions.find(e => e.label === 'depositos') ? true : false,
          retiros: selectedOptions.find(e => e.label === 'retiros') ? true : false,
          editLicenses: selectedOptions.find(e => e.label === 'editLicenses') ? true : false
        }
      };

      setLicensesUsers(prev => [...prev, newFormat]);
    }
  }

  console.log(licensesUsers)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateLicenses(licensesUsers)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center">
      {Array.from({ length: 3 }).map((_, index) => (
        <Select
          key={`a${index + 1}`}
          id={`a${index + 1}`}
          name={`a${index + 1}`}
          isMulti
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions) => handleChange(selectedOptions as MultiValue<{ label: string, value: string }>, index + 1)}
        />
      ))}
      <button type="submit">Actualizar</button>
    </form>
  );
}
