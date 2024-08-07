import { useGetInvoices } from "@/services/hooks";
import { DataTable } from "@/components/data-table";

import { LineVariant } from "@/components/line-variant";
import { ChartSkeleton } from "../skeletons/chart-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";

export const DashboardSection = () => {
  const { data, isLoading } = useGetInvoices();

  const energyKeys = {
    "Electric Energy": "electricEnergyQuantity",
    "SCEE Energy": "sceeeEnergyQuantityWithoutIcms",
    "Compensated Energy": "compensatedEnergyQuantity",
  };

  const monetaryKeys = {
    "Electric Energy Price": "electricEnergyPrice",
    "SCEEE Energy Price": "sceeeEnergyPriceWithoutIcms",
    "Compensated Energy Price": "compensatedEnergyPrice",
    "Municipal Lighting Price": "municipalPublicLightingPrice",
  };

  const energyData = data?.map((item) => ({
    name: item.referenceMonth,
    electricEnergyQuantity: item.electricEnergyQuantity,
    sceeeEnergyQuantityWithoutIcms: item.sceeeEnergyQuantityWithoutIcms,
    compensatedEnergyQuantity: item.compensatedEnergyQuantity,
  }));

  const monetaryData = data?.map((item) => ({
    name: item.referenceMonth,
    electricEnergyPrice: item.electricEnergyPrice,
    sceeeEnergyPriceWithoutIcms: item.sceeeEnergyPriceWithoutIcms,
    compensatedEnergyPrice: item.compensatedEnergyPrice,
    municipalPublicLightingPrice: item.municipalPublicLightingPrice,
  }));

  const energyColors = ["#0ea5e9", "#67e8f9", "#34d399"];
  const monetaryColors = ["#0ea5e9", "#67e8f9", "#34d399", "#f97316"];

  return (
    <div className="w-3/4 bg-sky-100/5 rounded-lg p-4 h-full overflow-y-auto">
      <div className="flex justify-around items-center w-full">
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <LineVariant
            isKwh
            xDataKey="name"
            dataKeys={energyKeys}
            colors={energyColors}
            selectData={data ?? []}
            chartData={energyData ?? []}
            title="Electric Energy (kWh)"
          />
        )}

        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <LineVariant
            xDataKey="name"
            selectData={data ?? []}
            dataKeys={monetaryKeys}
            colors={monetaryColors}
            title="Monetary Data (R$)"
            chartData={monetaryData ?? []}
          />
        )}
      </div>

      <div className="w-full h-px bg-gray-200 my-4" />
      {isLoading ? <TableSkeleton /> : <DataTable data={data ?? []} />}
    </div>
  );
};
