import NextAuth from 'next-auth'
import { Access } from './lib/users'

declare module 'next-auth' {
  interface User {
    id: string
    username: string
    password: string
    access: Access
  }
  export interface Session {
    user: User
  }
}
