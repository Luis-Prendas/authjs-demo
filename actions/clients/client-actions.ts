'use server'
import { type z } from 'zod'
import { db } from '@/lib/db'
import { FormClientSchema } from './client-form.z'
import { type Prisma } from '@prisma/client'

export async function getAllClientsByCompanyId (companyId: string) {
  const clients = await db.tBL_Client.findMany({
    where: {
      company_id: companyId,
      is_deleted: false
    },
    include: {
      TBL_User: true
    }
  })

  return clients
}
export type GetAllClientsByCompanyId = Prisma.PromiseReturnType<typeof getAllClientsByCompanyId>

export async function addClient (data: z.infer<typeof FormClientSchema>, companyId: string, createdBy: string) {
  try {
    const { email, identification, name, phone } = FormClientSchema.parse({
      email: data.email,
      identification: data.identification,
      name: data.name,
      phone: data.phone
    })

    await db.tBL_Client.create({
      data: {
        email,
        identification,
        name,
        phone,
        company_id: companyId,
        created_by: createdBy
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Cliente creado correctamente.'
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.'
    }
  }
}

export async function updateClient (data: z.infer<typeof FormClientSchema>, clientId: string) {
  try {
    const { email, identification, name, phone } = FormClientSchema.parse({
      email: data.email,
      identification: data.identification,
      name: data.name,
      phone: data.phone
    })

    await db.tBL_Client.update({
      where: {
        id: clientId
      },
      data: {
        email,
        identification,
        name,
        phone
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Cliente actualizado correctamente.'
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.'
    }
  }
}

export async function deleteClient (clientId: string) {
  try {
    await db.tBL_Client.update({
      where: {
        id: clientId
      },
      data: {
        is_deleted: true
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Cliente eliminado correctamente.'
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.'
    }
  }
}
