'use client'
import { loginAction } from "@/actions/signin-action";
import { Session } from "next-auth";
import { useState } from "react";

interface Props {
  session: Session | null
}

export default function FormSignIn({session} : Props) {
  const [errorSignIn, setErrorSignIn] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const responseSignIn = await loginAction(username, password)

    console.log(responseSignIn)

    if (responseSignIn?.error) setErrorSignIn(responseSignIn.error)
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 border border-gray-700 rounded flex flex-col gap-4 justify-center items-center'>
        <h2 className='text-xl font-bold'>Username And Password</h2>
        {errorSignIn && <span className='bg-red-300 text-red-700 px-4 py-2 rounded'>{errorSignIn}</span>}
        {session && <span className='bg-yellow-300 text-yellow-700 px-4 py-2 rounded'>¡Ya existe una sesión iniciada!</span>}
        <fieldset className='flex flex-col'>
          <label htmlFor="username">Username</label>
          <input readOnly={session ? true : false} defaultValue={session ? session.user.username : ''} className='px-4 py-2' type="text" required placeholder='user.name' id='username' name='username' />
        </fieldset>
        <fieldset className='flex flex-col'>
          <label htmlFor="password">Password</label>
          <input readOnly={session ? true : false} className='px-4 py-2' type="password" required placeholder='abc123456' id='password' name='password' />
        </fieldset>
        <button disabled={session ? true : false} type='submit' className='px-4 py-2 bg-gray-700 rounded'>SignIn</button>
      </form>
  )
}