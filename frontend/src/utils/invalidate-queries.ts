import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";

export const invalidateQueries = () => {
  setTimeout(() => {
    toast.info("Updating data...", { duration: 2500, className: "bg-sky-200" });
    queryClient.invalidateQueries({ queryKey: ["invoices"] });
    queryClient.invalidateQueries({ queryKey: ["energyInvoices"] });
    queryClient.invalidateQueries({ queryKey: ["monetaryInvoices"] });
  }, 3000);

  setTimeout(() => {
    toast.success("Data updated! 🚀", {
      duration: 2500,
      className: "bg-green-300",
    });
  }, 3500);
};
