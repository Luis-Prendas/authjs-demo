import { db } from '@/lib/db'
import { type Prisma } from '@prisma/client'

export async function getUserByUserName (userName: string) {
  const user = await db.tBL_User.findFirst({
    where: {
      user_name: userName.toLocaleLowerCase(),
      is_deleted: false
    }
  })

  return user
}
export type GetUserByUserName = Prisma.PromiseReturnType<typeof getUserByUserName>
