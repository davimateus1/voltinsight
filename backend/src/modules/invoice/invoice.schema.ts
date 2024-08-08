import * as z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export type GetInvoiceInput = z.infer<typeof getInvoiceSchema>;
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type DeleteInvoiceInput = z.infer<typeof deleteInvoiceSchema>;
export type BulkDeleteInvoiceInput = z.infer<typeof bulkDeleteInvoiceSchema>;

const invoiceCore = {
  id: z.string(),
  clientNumber: z.string(),
  referenceMonth: z.string(),
  clientDocumentUrl: z.string(),
  electricEnergyQuantity: z.number(),
  electricEnergyPrice: z.number(),
  sceeeEnergyQuantityWithoutIcms: z.number(),
  sceeeEnergyPriceWithoutIcms: z.number(),
  compensatedEnergyQuantity: z.number(),
  compensatedEnergyPrice: z.number(),
  municipalPublicLightingPrice: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
};

const createInvoiceSchema = z.instanceof(Buffer);
const deleteInvoiceSchema = z.object({ id: z.string() });
const bulkDeleteInvoiceSchema = z.object({ ids: z.array(z.string()) });
const getInvoiceSchema = z.object({ clientNumber: z.string().optional() });

const deleteInvoiceResponseSchema = z.string();
const bulkDeleteInvoiceResponseSchema = z.string();
const getInvoiceResponseSchema = z.array(z.object(invoiceCore));
const createInvoiceResponseSchema = z.object({ ...invoiceCore });

export const { schemas: invoiceSchemas, $ref } = buildJsonSchemas({
  getInvoiceSchema,
  createInvoiceSchema,
  deleteInvoiceSchema,
  bulkDeleteInvoiceSchema,
  getInvoiceResponseSchema,
  deleteInvoiceResponseSchema,
  createInvoiceResponseSchema,
  bulkDeleteInvoiceResponseSchema
});
