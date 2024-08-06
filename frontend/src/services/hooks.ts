import { getInvoices } from "./requests";
import { useQuery } from "@tanstack/react-query";

export const useGetInvoices = (clientNumber?: string) => {
  return useQuery({
    queryKey: ["invoices", clientNumber],
    queryFn: () => getInvoices(clientNumber),
  });
};
