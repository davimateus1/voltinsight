import Fastify from 'fastify';
import cors from '@fastify/cors';

import multipart from '@fastify/multipart';
import { cloudinaryConfig } from './utils/cloudinary';

import invoiceRoutes from './modules/invoice/invoice.route';
import { invoiceSchemas } from './modules/invoice/invoice.schema';

const server = Fastify();

const start = async () => {
  cloudinaryConfig();

  for (const schema of invoiceSchemas) {
    server.addSchema(schema);
  }

  server.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 }
  });

  server.register(cors, { origin: '*' });
  server.register(invoiceRoutes, { prefix: 'api/invoices' });

  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server listening at http://localhost:3000');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
