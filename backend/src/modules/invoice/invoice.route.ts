import { $ref } from './invoice.schema';
import { FastifyInstance } from 'fastify';
import { registerInvoiceHandler } from './invoice.controller';

const invoiceRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createInvoiceSchema'),
        response: {
          201: $ref('createInvoiceResponseSchema')
        }
      }
    },
    registerInvoiceHandler
  );
};

export default invoiceRoutes;
