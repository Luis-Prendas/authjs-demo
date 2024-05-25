'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export async function loginAction (username: string, password: string) {
  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo: '/dashboard'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Credenciales invalidas' }
        default:
          return { error: 'Hubo un error inesperado!' }
      }
    }
    throw error
  }
}
