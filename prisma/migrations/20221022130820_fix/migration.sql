-- DropForeignKey
ALTER TABLE "Exhibitor" DROP CONSTRAINT "Exhibitor_userId_fkey";

-- AlterTable
ALTER TABLE "Exhibitor" ALTER COLUMN "login" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exhibitor" ADD CONSTRAINT "Exhibitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
