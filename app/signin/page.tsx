import { IconLogin } from '@tabler/icons-react'
import FormSignIn from './_components/form-signin'
import { auth } from '@/auth'

export default async function PageSignIn() {
  const session = await auth()

  return (
    <main className="flex flex-col gap-4 justify-center items-center p-4 w-full h-full pb-80">
      <h1 className="text-3xl font-bold flex justify-center items-center gap-2"><IconLogin className='w-7 h-7' />Iniciar sesión</h1>
      <FormSignIn session={session} />
    </main>
  )
}
