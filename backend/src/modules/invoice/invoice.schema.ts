import * as z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const createInvoiceSchema = z.instanceof(Buffer);

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;

const invoiceCore = {
  id: z.string(),
  clientNumber: z.string(),
  referenceMonth: z.string(),
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

const createInvoiceResponseSchema = z.object({
  ...invoiceCore
});

const getInvoiceSchema = z.object({
  clientNumber: z.string().optional()
});

export type GetInvoiceInput = z.infer<typeof getInvoiceSchema>;

const getInvoiceResponseSchema = z.array(z.object(invoiceCore));

export const { schemas: invoiceSchemas, $ref } = buildJsonSchemas({
  getInvoiceSchema,
  createInvoiceSchema,
  getInvoiceResponseSchema,
  createInvoiceResponseSchema
});
