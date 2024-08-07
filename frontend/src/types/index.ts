export type Invoice = {
  id: string;
  createdAt: string;
  updatedAt: string;
  clientNumber: string;
  referenceMonth: string;
  clientDocumentUrl: string;
  electricEnergyPrice: number;
  compensatedEnergyPrice: number;
  electricEnergyQuantity: number;
  compensatedEnergyQuantity: number;
  sceeeEnergyPriceWithoutIcms: number;
  municipalPublicLightingPrice: number;
  sceeeEnergyQuantityWithoutIcms: number;
};

export type Filters = {
  monetaryData: string;
  electricEnergy: string;
};

export type ChartType = "monetaryData" | "electricEnergy";
