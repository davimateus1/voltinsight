import { toast } from "sonner";
import { useQuery, useMutation } from "@tanstack/react-query";
import { invalidateQueries } from "@/utils/invalidate-queries";

import {
  getInvoices,
  uploadInvoice,
  deleteInvoice,
  getEnergyInvoices,
  bulkDeleteInvoices,
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

export const useUploadInvoice = ({
  setFiles,
}: {
  setFiles: (files: File[]) => void;
}) => {
  const { mutate: uploadMutate, isPending: uploadPending } = useMutation({
    mutationFn: uploadInvoice,
    onSuccess: () => {
      toast.success("Invoice uploaded successfully 🚀", {
        duration: 2500,
        className: "bg-green-300 text-gray-900 text-md",
      });

      invalidateQueries();
      setFiles([]);
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

export const useDeleteInvoice = () => {
  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      toast.success("Invoice deleted successfully 🚀", {
        duration: 2500,
        className: "bg-green-300 text-gray-900 text-md",
      });

      invalidateQueries();
    },
    onError: () => {
      toast.error("An error occurred while deleting the invoice 🤯", {
        duration: 2500,
        className: "bg-red-300 text-gray-900 text-md",
      });
    },
  });

  return { deleteMutate, deletePending };
};

export const useBulkDeleteInvoices = () => {
  const { mutate: bulkDeleteMutate, isPending: bulkDeletePending } =
    useMutation({
      mutationFn: bulkDeleteInvoices,
      onSuccess: () => {
        toast.success("Invoices deleted successfully 🚀", {
          duration: 2500,
          className: "bg-green-300 text-gray-900 text-md",
        });

        invalidateQueries();
      },
      onError: () => {
        toast.error("An error occurred while deleting the invoices 🤯", {
          duration: 2500,
          className: "bg-red-300 text-gray-900 text-md",
        });
      },
    });

  return { bulkDeleteMutate, bulkDeletePending };
};
