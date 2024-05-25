import { z } from 'zod'

export const FormClientSchema = z.object({
  identification: z.string({
    required_error: 'Numero de identificaion requerido.'
  }),

  name: z.string({
    required_error: 'Nombre requerido.'
  }),

  email: z.string({
    required_error: 'Email requerido.'
  }).email({
    message: 'No es un correo valido.'
  }),

  phone: z.string({
    required_error: 'Telefono requerido.'
  })
})

export const ClientSchema = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  is_deleted: z.boolean(),

  company_id: z.string(),
  created_by: z.string(),
  name: z.string(),
  identification: z.string(),
  email: z.string(),
  phone: z.string()
})
export type Client = z.infer<typeof ClientSchema>
