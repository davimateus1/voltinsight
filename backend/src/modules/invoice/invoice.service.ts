import { db } from "../../utils/prisma";
import { CreateInvoiceInput } from "./invoice.schema";

export const createInvoice = async (input: CreateInvoiceInput) => {
  // treat the input and create the invoice

  const invoice = await db.invoice.create({
    data: {
      client_number: "123",
      compensated_energy_price: 0.1,
      compensated_energy_quantity: 100,
      eletric_energy_price: 0.2,
      eletric_energy_quantity: 200,
      municipal_public_lighting_price: 0.3,
      reference_month: "2021-01",
      sceee_energy_price_without_icms: 0.4,
      sceee_energy_quantity_without_icms: 400,
    },
  });

  return invoice;
};
