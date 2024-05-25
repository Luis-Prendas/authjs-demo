'use server'
import { db } from '@/lib/db'
import { type Prisma } from '@prisma/client'

export async function addJustificationAttachment (filePath: string, justificationId: string) {
  try {
    const newRow = await db.tBL_justification_attachment.create({
      data: {
        file_path: filePath,
        justification_id: justificationId
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Abjunto hecho correctamente.',
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

export async function getAttachmentsByJustificationId (justificationId: string) {
  try {
    const newRow = await db.tBL_justification_attachment.findMany({
      where: {
        justification_id: justificationId,
        is_deleted: false
      }
    })

    return {
      error: false,
      title: 'Exito',
      description: 'Abjunto hecho correctamente.',
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
export type GetAttachmentsByJustificationId = Prisma.PromiseReturnType<typeof getAttachmentsByJustificationId>
