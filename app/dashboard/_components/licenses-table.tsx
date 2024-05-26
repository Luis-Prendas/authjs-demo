'use client'
import { LICENSES, License, Role, USERS } from "@/lib/users";
import { useLicensesStore } from "@/stores/useStore";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select, { MultiValue } from 'react-select';

const OPTIONS = [
  { value: 'transactions', label: 'Transacciones' },
  { value: 'deposits', label: 'Depositos' },
  { value: 'Withdrawals', label: 'Retiros' },
  { value: 'editLicenses', label: 'Editar Licensias' },
]

export default function LicensesTable() {
  const { users, updateUserLicenses } = useLicensesStore();
  const [newLicenseUser, setNewLicenseUser] = useState<User[]>([]);
  const router = useRouter()

  const handleChange = (selectedOptions: MultiValue<{ label: string, value: string }>, userId: string) => {
    const newLicenses: License[] = [];
    selectedOptions.forEach(e => {
      const findLicenseInfo = LICENSES.find(i => i.licenseName === e.value);
      newLicenses.push({
        description: findLicenseInfo?.description!,
        displayName: e.label,
        licenseName: e.value,
        route: findLicenseInfo?.route!
      });
    });

    const existNewLicenseUserIndex = newLicenseUser.findIndex(e => e.id === userId);

    if (existNewLicenseUserIndex === -1) {
      const newUser: User = {
        id: userId,
        password: '',
        username: '',
        access: {
          role: Role.Null,
          licenses: newLicenses
        }
      };
      setNewLicenseUser(prev => [...prev, newUser]);
    } else {
      const updatedUsers = [...newLicenseUser];
      updatedUsers[existNewLicenseUserIndex] = {
        ...updatedUsers[existNewLicenseUserIndex],
        access: {
          ...updatedUsers[existNewLicenseUserIndex].access,
          licenses: newLicenses
        }
      };
      setNewLicenseUser(updatedUsers);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateUserLicenses(newLicenseUser)
    router.push('/dashboard')
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center p-4 rounded bg-white border border-gray-300">
      {USERS.map(user => (
        <div key={user.id} className="flex flex-col justify-center items-start">
          <label>{user.access.role}</label>
          <Select
            isMulti
            options={OPTIONS}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) => handleChange(selectedOptions as MultiValue<{ label: string, value: string }>, user.id!)}
          />
        </div>
      ))}
      <button className='px-4 py-2 bg-gray-300 rounded' type="submit">Actualizar</button>
    </form>
  );
}
