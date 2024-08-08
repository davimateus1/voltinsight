import { $ref } from './invoice.schema';
import { FastifyInstance } from 'fastify';

import {
  getInvoicesHandler,
  deleteInvoiceHandler,
  registerInvoiceHandler,
  bulkDeleteInvoiceHandler
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
    '/:clientNumber?',
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

  server.delete(
    '/:id',
    {
      schema: {
        params: $ref('deleteInvoiceSchema'),
        response: {
          200: $ref('deleteInvoiceResponseSchema')
        }
      }
    },
    deleteInvoiceHandler
  );

  server.post(
    '/bulk-delete',
    {
      schema: {
        body: $ref('bulkDeleteInvoiceSchema'),
        response: {
          200: $ref('bulkDeleteInvoiceResponseSchema')
        }
      }
    },
    bulkDeleteInvoiceHandler
  );
};

export default invoiceRoutes;
