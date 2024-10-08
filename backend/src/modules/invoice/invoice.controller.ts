import fs from 'fs';
import util from 'util';

import { pipeline } from 'stream';
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  getInvoices,
  deleteInvoice,
  createInvoice,
  bulkDeleteInvoices
} from './invoice.service';

const pump = util.promisify(pipeline);

export const registerInvoiceHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = await request.file();

    if (!data) {
      return reply.code(400).send({ message: 'No file uploaded' });
    }

    const fileName = `./src/uploads/${data.filename}`;
    const fileStream = fs.createWriteStream(fileName);

    await pump(data.file, fileStream);
    const result = await createInvoice(data.filename);

    return reply.send({ message: result });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return reply.code(500).send({ message: 'Error uploading file' });
  }
};

export const getInvoicesHandler = async (
  request: FastifyRequest<{ Params: { clientNumber: string } }>,
  reply: FastifyReply
) => {
  const { clientNumber } = request.params;

  try {
    const invoices = await getInvoices(clientNumber);
    return reply.send(invoices);
  } catch (error) {
    console.error('Error getting invoices:', error);
    return reply.code(500).send({ message: 'Error getting invoices' });
  }
};

export const deleteInvoiceHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  try {
    const result = await deleteInvoice(id);
    return reply.send({ message: result });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return reply.code(500).send({ message: 'Error deleting invoice' });
  }
};

export const bulkDeleteInvoiceHandler = async (
  request: FastifyRequest<{ Body: { ids: string[] } }>,
  reply: FastifyReply
) => {
  const { ids } = request.body;

  try {
    const result = await bulkDeleteInvoices(ids);
    return reply.send({ message: result });
  } catch (error) {
    console.error('Error deleting invoices:', error);
    return reply.code(500).send({ message: 'Error deleting invoices' });
  }
};
