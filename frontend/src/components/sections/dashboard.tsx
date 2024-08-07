import { useState } from "react";
import { ChartType } from "@/types";

import {
  energyKeys,
  monetaryKeys,
  energyColors,
  monetaryColors,
} from "@/utils/consts";

import {
  useGetInvoices,
  useGetEnergyInvoices,
  useGetMonetaryInvoices,
} from "@/services/hooks";

import { DataTable } from "@/components/data-table";
import { LineVariant } from "@/components/line-variant";

export const DashboardSection = () => {
  const [filters, setFilters] = useState({
    monetaryData: "",
    electricEnergy: "",
  });

  const { allInvoices, allInvoicesLoading } = useGetInvoices();

  const { energyChartData, isLoadingEnergy } = useGetEnergyInvoices(
    filters.electricEnergy
  );
  const { monetaryChartData, isLoadingMonetary } = useGetMonetaryInvoices(
    filters.monetaryData
  );

  const energyData =
    energyChartData?.map((item) => ({
      name: item.referenceMonth,
      electricEnergyQuantity: item.electricEnergyQuantity,
      compensatedEnergyQuantity: item.compensatedEnergyQuantity,
      sceeeEnergyQuantityWithoutIcms: item.sceeeEnergyQuantityWithoutIcms,
    })) ?? [];

  const monetaryData =
    monetaryChartData?.map((item) => ({
      name: item.referenceMonth,
      electricEnergyPrice: item.electricEnergyPrice,
      compensatedEnergyPrice: item.compensatedEnergyPrice,
      sceeeEnergyPriceWithoutIcms: item.sceeeEnergyPriceWithoutIcms,
      municipalPublicLightingPrice: item.municipalPublicLightingPrice,
    })) ?? [];

  const handleClear = (type: ChartType) => {
    setFilters((prev) => ({ ...prev, [type]: "" }));
  };

  const handleClientNumberChange = (clientNumber: string, type: ChartType) => {
    setFilters((prev) => ({ ...prev, [type]: clientNumber }));
  };

  return (
    <div className="w-3/4 bg-sky-100/5 rounded-lg p-4 h-full overflow-y-auto">
      <div className="flex justify-around items-center w-full">
        <LineVariant
          isKwh
          xDataKey="name"
          dataKeys={energyKeys}
          colors={energyColors}
          chartData={energyData}
          selectData={allInvoices}
          isLoading={isLoadingEnergy}
          title="Electric Energy (kWh)"
          clientNumber={filters.electricEnergy}
          handleClear={() => handleClear("electricEnergy")}
          handleClientNumberChange={(clientNumber) =>
            handleClientNumberChange(clientNumber, "electricEnergy")
          }
        />
        <LineVariant
          xDataKey="name"
          dataKeys={monetaryKeys}
          colors={monetaryColors}
          chartData={monetaryData}
          selectData={allInvoices}
          title="Monetary Data (R$)"
          isLoading={isLoadingMonetary}
          clientNumber={filters.monetaryData}
          handleClear={() => handleClear("monetaryData")}
          handleClientNumberChange={(clientNumber) =>
            handleClientNumberChange(clientNumber, "monetaryData")
          }
        />
      </div>
      <div className="w-full h-px bg-gray-200 my-4" />
      <DataTable data={allInvoices} isLoading={allInvoicesLoading} />
    </div>
  );
};
