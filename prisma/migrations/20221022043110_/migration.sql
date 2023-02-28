/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Exhibitor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Exhibitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exhibitor" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "rate" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Exhibitor_userId_key" ON "Exhibitor"("userId");

-- AddForeignKey
ALTER TABLE "Exhibitor" ADD CONSTRAINT "Exhibitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Exhibitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
