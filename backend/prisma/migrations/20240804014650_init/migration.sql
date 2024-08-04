-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "client_number" TEXT NOT NULL,
    "reference_month" TEXT NOT NULL,
    "eletric_energy_quantity" DOUBLE PRECISION NOT NULL,
    "eletric_energy_price" DOUBLE PRECISION NOT NULL,
    "sceee_energy_quantity_without_icms" DOUBLE PRECISION NOT NULL,
    "sceee_energy_price_without_icms" DOUBLE PRECISION NOT NULL,
    "compensated_energy_quantity" DOUBLE PRECISION NOT NULL,
    "compensated_energy_price" DOUBLE PRECISION NOT NULL,
    "municipal_public_lighting_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
