import { apiInstance } from "@/services/api";
import { Invoice } from "@/types";

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await apiInstance.get("/invoices");
  return response.data;
};

export const getEnergyInvoices = async (
  clientNumber: string
): Promise<Invoice[]> => {
  const response = await apiInstance.get(`/invoices/${clientNumber}`);
  return response.data;
};

export const getMonetaryInvoices = async (
  clientNumber: string
): Promise<Invoice[]> => {
  const response = await apiInstance.get(`/invoices/${clientNumber}`);
  return response.data;
};
