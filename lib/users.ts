export enum Role {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'super-admin'
}

export interface User {
  id: string
  username: string
  password: string
  role: Role
}

export const USERS: User[] = [
  { id: '1', username: 'a1', password: 'a1', role: Role.User },
  { id: '2', username: 'a2', password: 'a2', role: Role.Admin },
  { id: '3', username: 'a3', password: 'a3', role: Role.SuperAdmin }
]

export const findByUsername = (username: string) => {
  return USERS.find(e => e.username === username)
}