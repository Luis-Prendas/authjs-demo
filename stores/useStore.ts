import { License, USERS } from '@/lib/users';
import { User } from 'next-auth';
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface State {
  users: User[]
  getLicenses: (userId: string) => License[] | null
  updateUserLicenses: (users: User[]) => void
}

export const useLicensesStore = create<State>()(devtools(persist((set, get) => {
  return {
    users: USERS,

    getLicenses: (userId: string) => {
      const { users } = get()
      const licenses = users.find(e => e.id === userId)?.access.licenses
      return licenses || null
    },

    updateUserLicenses: (users: User[]) => {
      set({ users })
    }
  }
}, {
  name: 'licenses'
})))
