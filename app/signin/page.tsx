'use client'
import { loginAction } from '@/actions/signin-action'
import { useCurrentUser } from '@/hooks/use-current-user'
import { IconLink, IconLogin } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PageSignIn() {
  const [errorSignIn, setErrorSignIn] = useState<string | null>(null)

  const session = useCurrentUser()

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const responseSignIn = await loginAction(username, password)

    console.log(responseSignIn)

    if (responseSignIn?.error) {
      setErrorSignIn(responseSignIn.error)
      return
    }

    router.refresh()
  }

  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 w-full h-full">
      <h1 className="text-3xl font-bold flex justify-center items-center gap-2"><IconLogin />SIGN-IN</h1>

      <form onSubmit={handleSubmit} className='p-4 border border-gray-700 rounded flex flex-col gap-4 justify-center items-center'>
        <h2 className='text-xl font-bold'>Username And Password</h2>
        {errorSignIn && <span className='bg-red-700 text-red-300 px-4 py-2 rounded'>{errorSignIn}</span>}
        {session && <span className='bg-yellow-700 text-yellow-300 px-4 py-2 rounded'>¡Ya existe una sesión iniciada!</span>}
        <fieldset className='flex flex-col'>
          <label htmlFor="username">Username</label>
          <input readOnly={session ? true : false} value={session && session.username} className='px-4 py-2' type="text" required placeholder='user.name' id='username' name='username' />
        </fieldset>
        <fieldset className='flex flex-col'>
          <label htmlFor="password">Password</label>
          <input readOnly={session ? true : false} value={session && '.'.repeat(session.password.length)} className='px-4 py-2' type="password" required placeholder='abc123456' id='password' name='password' />
        </fieldset>
        <button disabled={session ? true : false} type='submit' className='px-4 py-2 bg-gray-700 rounded'>SignIn</button>
      </form>
    </main>
  )
}
