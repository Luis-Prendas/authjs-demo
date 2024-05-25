import { z } from 'zod'

export const FomrInvoiceJustifySchema = z.object({
  reason: z.string({
    required_error: 'Razón requerida.'
  })
    .min(10, 'La razón debe tener al menos 10 caracteres.')
    .max(255, 'La razón no puede tener más de 255 caracteres.'),

  file: typeof window === 'undefined'
    ? z.any()
    : z.instanceof(FileList)
      .refine((file) => file?.length !== 0, 'Se requiere un abjunto.')
      .refine(file => file?.[0]?.size < (5 * 1024 * 1024), 'El archivo debe ser menor o igual a 5 megabytes.')
})
