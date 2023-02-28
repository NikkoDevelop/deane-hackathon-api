-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_exhibitorId_fkey";

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "is_published" DROP NOT NULL,
ALTER COLUMN "exhibitorId" DROP NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL,
ALTER COLUMN "rate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Exhibitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
