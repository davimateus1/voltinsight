import { apiInstance } from "@/services/api";
import { Invoice } from "@/types";

export const getInvoices = async (
  clientNumber?: string
): Promise<Invoice[]> => {
  const response = await apiInstance.get("/invoices", {
    params: { clientNumber },
  });

  return response.data;
};
