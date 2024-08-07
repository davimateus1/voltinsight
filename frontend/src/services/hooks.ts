import {
  getInvoices,
  getEnergyInvoices,
  getMonetaryInvoices,
} from "@/services/requests";

import { useQuery } from "@tanstack/react-query";

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

  return { monetaryChartData, isLoadingMonetary };
};
