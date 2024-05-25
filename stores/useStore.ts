import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface LicenseDetails {
  [license: string]: boolean;
}

export interface License {
  role: string,
  licenses: LicenseDetails
}

interface State {
  licenses: License[]
  getLicenses: (userRole: string) => License | null
  updateLicenses: (licenses: License[]) => void
}

export const useLicensesStore = create<State>()(devtools(persist((set, get) => {
  return {
    licenses: [
      { role: 'user', licenses: { transacciones: true, depositos: true, retiros: false, editLicenses: false } },
      { role: 'admin', licenses: { transacciones: true, depositos: true, retiros: true, editLicenses: false } },
      { role: 'super-admin', licenses: { transacciones: true, depositos: true, retiros: true, editLicenses: true } },
    ],

    getLicenses: (userRole: string) => {
      const { licenses } = get()
      const license = licenses.find(e => e.role === userRole)
      return license || null
    },

    updateLicenses: (licenses: License[]) => {
      set({ licenses })
    }
  }
}, {
  name: 'licenses'
})))
