/*
  Warnings:

  - A unique constraint covering the columns `[client_number]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client_document_url` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "client_document_url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_client_number_key" ON "Invoice"("client_number");
