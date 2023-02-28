/*
  Warnings:

  - You are about to drop the column `category_id` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_category_id_fkey";

-- DropIndex
DROP INDEX "Category_category_id_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "category_id",
ADD COLUMN     "sub_category" INTEGER;
