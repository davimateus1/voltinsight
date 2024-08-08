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

export const uploadInvoice = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  await apiInstance.post("/invoices", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteInvoice = async (id: string): Promise<void> => {
  await apiInstance.delete(`/invoices/${id}`);
};

export const bulkDeleteInvoices = async (ids: string[]): Promise<void> => {
  await apiInstance.post("/invoices/bulk-delete", { ids });
};
