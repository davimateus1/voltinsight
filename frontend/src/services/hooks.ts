import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

import {
  useQuery,
  useMutation,
  InvalidateQueryFilters,
} from "@tanstack/react-query";

import {
  getInvoices,
  uploadInvoice,
  getEnergyInvoices,
  getMonetaryInvoices,
} from "@/services/requests";

export const useGetInvoices = () => {
  const { data: allInvoices, isLoading: allInvoicesLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoices(),
  });

  return { allInvoices: allInvoices ?? [], allInvoicesLoading };
};

export const useGetEnergyInvoices = (clientNumber: string) => {
  const { data: energyChartData, isLoading: isLoadingEnergy } = useQuery({
    queryKey: ["energyInvoices", clientNumber],
    queryFn: () => getEnergyInvoices(clientNumber),
  });

  return { energyChartData: energyChartData ?? [], isLoadingEnergy };
};

export const useGetMonetaryInvoices = (clientNumber: string) => {
  const { data: monetaryChartData, isLoading: isLoadingMonetary } = useQuery({
    queryKey: ["monetaryInvoices", clientNumber],
    queryFn: () => getMonetaryInvoices(clientNumber),
  });

  return { monetaryChartData: monetaryChartData ?? [], isLoadingMonetary };
};

export const useUploadInvoice = () => {
  const { mutate: uploadMutate, isPending: uploadPending } = useMutation({
    mutationFn: uploadInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices"] as InvalidateQueryFilters);
      queryClient.invalidateQueries([
        "energyInvoices",
      ] as InvalidateQueryFilters);
      queryClient.invalidateQueries([
        "monetaryInvoices",
      ] as InvalidateQueryFilters);

      toast.success("Invoice uploaded successfully 🚀", {
        duration: 2500,
        className: "bg-green-300 text-gray-900 text-md",
      });
    },
    onError: () => {
      toast.error("An error occurred while uploading the invoice 🤯", {
        duration: 2500,
        className: "bg-red-300 text-gray-900 text-md",
      });
    },
  });

  return { uploadMutate, uploadPending };
};
