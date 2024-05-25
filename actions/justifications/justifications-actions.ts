'use server'
import { db } from '@/lib/db'
import { type Prisma } from '@prisma/client'

export async function addJustification (reason: string, invoiceId: string) {
  try {
    const newRow = await db.tBL_Justification.create({
      data: {
        reason,
        invoice_id: invoiceId
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Factura justificada correctamente.',
      data: newRow
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.',
      data: null
    }
  }
}

export async function getJustificationByInvoiceId (invoiceId: string) {
  try {
    const newRow = await db.tBL_Justification.findFirst({
      where: {
        invoice_id: invoiceId,
        is_deleted: false
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Factura justificada correctamente.',
      data: newRow
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.',
      data: null
    }
  }
}
export type GetJustificationByInvoiceId = Prisma.PromiseReturnType<typeof getJustificationByInvoiceId>

export async function getAllJustificationByInvoiceId (invoiceId: string) {
  try {
    const newRow = await db.tBL_Justification.findMany({
      where: {
        invoice_id: invoiceId,
        is_deleted: false
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Factura justificada correctamente.',
      data: newRow
    }
  } catch (error) {
    return {
      error: true,
      title: 'Algo salio mal',
      description: 'Inténtalo de nuevo o contacta con tu proveedor si el error persiste.',
      data: null
    }
  }
}
export type GetAllJustificationByInvoiceId = Prisma.PromiseReturnType<typeof getAllJustificationByInvoiceId>
