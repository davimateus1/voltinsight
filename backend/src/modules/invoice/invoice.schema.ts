import * as z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const createInvoiceSchema = z.instanceof(Buffer);

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;

const invoiceCore = {
  id: z.string(),
  clientNumber: z.string(),
  referenceMonth: z.string(),
  eletricEnergyQuantity: z.number(),
  eletricEnergyPrice: z.number(),
  sceeeEnergyQuantityWithoutIcms: z.number(),
  sceeeEnergyPriceWithoutIcms: z.number(),
  compensatedEnergyQuantity: z.number(),
  compensatedEnergyPrice: z.number(),
  municipalPublicLightingPrice: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
};

const createInvoiceResponseSchema = z.object({
  ...invoiceCore
});

export const { schemas: invoiceSchemas, $ref } = buildJsonSchemas({
  createInvoiceSchema,
  createInvoiceResponseSchema
});
