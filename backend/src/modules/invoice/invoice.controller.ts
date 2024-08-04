import { createInvoice } from "./invoice.service";
import { FastifyReply, FastifyRequest } from "fastify";

export const registerInvoiceHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const body = request.body as any; // fix

  try {
    const invoice = await createInvoice(body);
    reply.code(201).send(invoice);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Internal server error", error });
  }
};
