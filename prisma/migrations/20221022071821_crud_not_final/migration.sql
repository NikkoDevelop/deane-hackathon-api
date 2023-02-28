/*
  Warnings:

  - You are about to drop the column `cateroty_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `partners` on the `Exhibitor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category_id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exhibitorId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exhibitorId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exhibitorId` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exhibitorId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_cateroty_id_fkey";

-- DropIndex
DROP INDEX "Category_cateroty_id_key";

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "exhibitorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "cateroty_id",
ADD COLUMN     "category_id" INTEGER;

-- AlterTable
ALTER TABLE "Exhibitor" DROP COLUMN "partners",
ADD COLUMN     "partners_table" TEXT;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "exhibitorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "exhibitorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "exhibitorId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_id_key" ON "Category"("category_id");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
