import Fastify from 'fastify';
import cors from '@fastify/cors';

import multipart from '@fastify/multipart';
import { cloudinaryConfig } from './utils/cloudinary';

import invoiceRoutes from './modules/invoice/invoice.route';
import { invoiceSchemas } from './modules/invoice/invoice.schema';

const server = Fastify();

const host = process.env.SERVER_HOST || '0.0.0.0';
const port = Number(process.env.SERVER_PORT) || 3000;

const start = async () => {
  cloudinaryConfig();
  for (const schema of invoiceSchemas) server.addSchema(schema);

  server.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 }
  });

  server.register(cors, { origin: '*' });
  server.register(invoiceRoutes, { prefix: 'api/invoices' });

  try {
    await server.listen({ port, host });
    console.log(`🚀 Server running on port ${port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
