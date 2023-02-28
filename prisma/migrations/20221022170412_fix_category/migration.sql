-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_exhibitorId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "connection_type" DROP NOT NULL,
ALTER COLUMN "is_published" DROP NOT NULL,
ALTER COLUMN "exhibitorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
