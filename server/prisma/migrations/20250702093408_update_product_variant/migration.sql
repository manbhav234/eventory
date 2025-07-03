/*
  Warnings:

  - You are about to drop the column `color` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `variantType` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantValue` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VariantType" AS ENUM ('Color', 'Size', 'Weight');

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "color",
DROP COLUMN "size",
DROP COLUMN "weight",
ADD COLUMN     "variantType" "VariantType" NOT NULL,
ADD COLUMN     "variantValue" TEXT NOT NULL;
