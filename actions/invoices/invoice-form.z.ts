import { z } from 'zod'
import { ClientSchema } from '../clients/client-form.z'

export const FormInvoiceSchema = z.object({
  amount: z.coerce.number({
    required_error: 'Monto requerido.'
  }),

  clientId: z.string({
    required_error: 'Seleccione un cliente.'
  })
})

export const InvoiceSchema = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  is_deleted: z.boolean(),

  company_id: z.string(),
  client_id: z.string(),
  state_id: z.string(),
  created_by: z.string(),
  amount: z.number(),

  TBL_Client: ClientSchema
})
export type Invoice = z.infer<typeof InvoiceSchema>
