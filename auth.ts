import NextAuth, { type NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Access, findByUsername } from './lib/users'

interface Credentials {
  username: string
  password: string
}

export const authConfig = {
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const data = credentials as Credentials

        if (!data.username || !data.password) return null

        const user = findByUsername(data.username)

        if (!user) return null

        const response = {
          id: user.id,
          username: user.username,
          password: user.password,
          access: user.access
        }

        return response
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.access = user.access
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.access = token.access as Access
      }
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const paths = ['/dashboard']
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('api/auth/signin', nextUrl.origin)
        redirectUrl.searchParams.append('callbackUrl', nextUrl.href)
        return Response.redirect(redirectUrl)
      }

      return true
    }
  }
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn
} = NextAuth(authConfig)
