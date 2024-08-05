import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';

import { createInvoice } from './invoice.service';
import { FastifyReply, FastifyRequest } from 'fastify';

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
    await createInvoice(data.filename);

    return reply.send({ message: 'File uploaded' });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return reply.code(500).send({ message: 'Error uploading file' });
  }
};
