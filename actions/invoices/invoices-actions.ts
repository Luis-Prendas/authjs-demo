'use server'
import { type z } from 'zod'
import { db } from '@/lib/db'
import { type Prisma } from '@prisma/client'
import { FormInvoiceSchema } from './invoice-form.z'

export async function getAllInvoicesByCompanyId (companyId: string) {
  const invoices = await db.tBL_Invoice.findMany({
    where: {
      company_id: companyId,
      is_deleted: false
    },
    include: {
      TBL_Client: true,
      TBL_State: true,
      TBL_User: true
    }
  })

  return invoices
}
export type GetAllInvoicesByCompanyId = Prisma.PromiseReturnType<typeof getAllInvoicesByCompanyId>

export async function addInvoice (data: z.infer<typeof FormInvoiceSchema>, companyId: string, createdBy: string) {
  try {
    const { amount, clientId } = FormInvoiceSchema.parse({
      amount: data.amount,
      clientId: data.clientId
    })

    await db.tBL_Invoice.create({
      data: {
        amount,
        client_id: clientId,
        company_id: clientId,
        created_by: createdBy,
        state_id: 'd2581917-b742-4d70-ac75-7de1750655ae'
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Factura creada correctamente.'
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.'
    }
  }
}

export async function updateInvoice (data: z.infer<typeof FormInvoiceSchema>, invoiceId: string) {
  try {
    const { amount, clientId } = FormInvoiceSchema.parse({
      amount: data.amount,
      clientId: data.clientId
    })

    const newRow = await db.tBL_Invoice.update({
      where: {
        id: invoiceId
      },
      data: {
        amount,
        client_id: clientId
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Factura actualizada correctamente.',
      data: newRow
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.'
    }
  }
}

export async function deleteInvoice (invoiceId: string) {
  try {
    const newRow = await db.tBL_Invoice.update({
      where: {
        id: invoiceId
      },
      data: {
        is_deleted: true
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Factura eliminada correctamente.',
      data: newRow
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.'
    }
  }
}

export async function changeStateInvoice (stateId: string, invoiceId: string) {
  try {
    const newRow = await db.tBL_Invoice.update({
      where: {
        id: invoiceId
      },
      data: {
        state_id: stateId
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Factura actualizada correctamente.',
      data: newRow
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.'
    }
  }
}
