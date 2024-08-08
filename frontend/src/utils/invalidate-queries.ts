import { queryClient } from "@/lib/react-query";

export const invalidateQueries = () => {
  setTimeout(() => {
    queryClient.invalidateQueries({ queryKey: ["invoices"] });
    queryClient.invalidateQueries({ queryKey: ["energyInvoices"] });
    queryClient.invalidateQueries({ queryKey: ["monetaryInvoices"] });
  }, 2000);
};
