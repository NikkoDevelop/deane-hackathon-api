/*
  Warnings:

  - Added the required column `authorId` to the `Catalog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exhibitorId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "is_moderate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderate_message" TEXT,
ADD COLUMN     "moderate_verdict" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Catalog" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "is_moderate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderate_message" TEXT,
ADD COLUMN     "moderate_verdict" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "exhibitorId" INTEGER NOT NULL,
ADD COLUMN     "is_moderate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderate_message" TEXT,
ADD COLUMN     "moderate_verdict" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Exhibitor" ADD COLUMN     "is_moderate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderate_message" TEXT,
ADD COLUMN     "moderate_verdict" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "is_moderate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderate_message" TEXT,
ADD COLUMN     "moderate_verdict" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "is_moderate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderate_message" TEXT,
ADD COLUMN     "moderate_verdict" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "is_moderate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderate_message" TEXT,
ADD COLUMN     "moderate_verdict" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "is_moderate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderate_message" TEXT,
ADD COLUMN     "moderate_verdict" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "is_moderate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderate_message" TEXT,
ADD COLUMN     "moderate_verdict" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Catalog" ADD CONSTRAINT "Catalog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Exhibitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
