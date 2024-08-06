import { $ref } from './invoice.schema';
import { FastifyInstance } from 'fastify';

import {
  getInvoicesHandler,
  registerInvoiceHandler
} from './invoice.controller';

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

  server.get(
    '/:clientNumber',
    {
      schema: {
        params: $ref('getInvoiceSchema'),
        response: {
          200: $ref('getInvoiceResponseSchema')
        }
      }
    },
    getInvoicesHandler
  );
};

export default invoiceRoutes;
