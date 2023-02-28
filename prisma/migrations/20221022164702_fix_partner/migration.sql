-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_mediaId_fkey";

-- AlterTable
ALTER TABLE "Partner" ALTER COLUMN "display_order" DROP NOT NULL,
ALTER COLUMN "is_published" DROP NOT NULL,
ALTER COLUMN "mediaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
