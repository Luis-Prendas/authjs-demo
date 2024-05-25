import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    username: string
    password: string
    role: string
  }
  interface Session {
    user: User
  }
}
