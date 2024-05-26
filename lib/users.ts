export enum Role {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'super-admin',
  Null = ''
}

export interface License {
  licenseName: string
  displayName: string
  description: string
  route: string
}

export interface Access {
  role: Role
  licenses: License[]
}

export interface User {
  id: string
  username: string
  password: string
  access: Access
}

export const LICENSES: License[] = [
  { licenseName: 'transactions', displayName: 'Transacciones', route: '#', description: 'License used to view transactions.' },
  { licenseName: 'deposits', displayName: 'Depositos', route: '#', description: 'License used to view deposits.' },
  { licenseName: 'Withdrawals', displayName: 'Retiros', route: '#',  description: 'License used to view withdrawals.' },
  { licenseName: 'editLicenses', displayName: 'Editar Licensias', route: '/dashboard/edit-license',   description: 'License used for editing licenses.' }
]

export const USERS: User[] = [
  {
    id: '1',
    username: 'a1',
    password: 'a1',
    access: {
      role: Role.User,
      licenses: [LICENSES[0], LICENSES[1]]
    }
  },
  {
    id: '2',
    username: 'a2',
    password: 'a2',
    access: {
      role: Role.Admin,
      licenses: [LICENSES[0], LICENSES[1], LICENSES[2]]
    }
  },
  {
    id: '3',
    username: 'a3',
    password: 'a3',
    access: {
      role: Role.SuperAdmin,
      licenses: [LICENSES[0], LICENSES[1], LICENSES[2], LICENSES[3]]
    }
  },
]

export const findByUsername = (username: string) => {
  return USERS.find(e => e.username === username)
}