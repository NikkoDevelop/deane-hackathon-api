/*
  Warnings:

  - Made the column `name` on table `Exhibitor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exhibitor" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "is_import_substitution" DROP NOT NULL,
ALTER COLUMN "is_moderate" DROP NOT NULL,
ALTER COLUMN "moderate_verdict" DROP NOT NULL;
