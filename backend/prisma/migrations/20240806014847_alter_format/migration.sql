/*
  Warnings:

  - You are about to drop the column `client_document_url` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `client_number` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `compensated_energy_price` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `compensated_energy_quantity` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `eletric_energy_price` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `eletric_energy_quantity` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `municipal_public_lighting_price` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `reference_month` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `sceee_energy_price_without_icms` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `sceee_energy_quantity_without_icms` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `clientDocumentUrl` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compensatedEnergyPrice` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compensatedEnergyQuantity` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricEnergyPrice` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricEnergyQuantity` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipalPublicLightingPrice` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceMonth` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sceeeEnergyPriceWithoutIcms` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sceeeEnergyQuantityWithoutIcms` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "client_document_url",
DROP COLUMN "client_number",
DROP COLUMN "compensated_energy_price",
DROP COLUMN "compensated_energy_quantity",
DROP COLUMN "eletric_energy_price",
DROP COLUMN "eletric_energy_quantity",
DROP COLUMN "municipal_public_lighting_price",
DROP COLUMN "reference_month",
DROP COLUMN "sceee_energy_price_without_icms",
DROP COLUMN "sceee_energy_quantity_without_icms",
ADD COLUMN     "clientDocumentUrl" TEXT NOT NULL,
ADD COLUMN     "clientNumber" TEXT NOT NULL,
ADD COLUMN     "compensatedEnergyPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "compensatedEnergyQuantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "electricEnergyPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "electricEnergyQuantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "municipalPublicLightingPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "referenceMonth" TEXT NOT NULL,
ADD COLUMN     "sceeeEnergyPriceWithoutIcms" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sceeeEnergyQuantityWithoutIcms" DOUBLE PRECISION NOT NULL;
