/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MetaTagsEnum" AS ENUM ('Robots', 'Viewport', 'Charset', 'Content_type', 'Refresh', 'Author', 'Copyright', 'Title', 'Description', 'Keywords');

-- CreateEnum
CREATE TYPE "ExhibitorCategoryEnum" AS ENUM ('category_1', 'category_2', 'category_3', 'category_4', 'category_5');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('image', 'video');

-- CreateEnum
CREATE TYPE "VisibleCostEnum" AS ENUM ('yes', 'no', 'text_only');

-- CreateEnum
CREATE TYPE "ConnectionTypeEnum" AS ENUM ('parent', 'child');

-- CreateEnum
CREATE TYPE "ProductTypeEnum" AS ENUM ('product', 'service');

-- CreateEnum
CREATE TYPE "PossibilityOfPurchaseEnum" AS ENUM ('wholesale', 'retail');

-- CreateEnum
CREATE TYPE "PaymentMethodEnum" AS ENUM ('cash', 'non_cash');

-- CreateEnum
CREATE TYPE "DeliveryMethodEnum" AS ENUM ('courier', 'fast_courier', 'mail', 'cdek');

-- CreateEnum
CREATE TYPE "StandardEnum" AS ENUM ('gost', 'iso');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR(512) NOT NULL,
    "type" "MediaType" NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catalog" (
    "id" SERIAL NOT NULL,
    "is_visible_cost" "VisibleCostEnum" NOT NULL,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exhibitor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(512),
    "description" TEXT,
    "meta_tags" "MetaTagsEnum"[],
    "company_description" TEXT,
    "logoId" INTEGER,
    "mail_logoId" INTEGER,
    "category" "ExhibitorCategoryEnum" NOT NULL,
    "site_url" VARCHAR(512),
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT[],
    "notification_email" TEXT,
    "phone" TEXT,
    "contact_person" TEXT,
    "inn" TEXT,
    "legal_adress" TEXT,
    "factory_adress" TEXT,
    "location_table" TEXT,
    "partners" TEXT,
    "clients" TEXT,
    "portfolio" TEXT,
    "import_substitution" TEXT,
    "is_import_substitution" BOOLEAN NOT NULL DEFAULT false,
    "catalogId" INTEGER,

    CONSTRAINT "Exhibitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "adress" TEXT,
    "gps_coords" TEXT,
    "name" TEXT,
    "cooperation_type" TEXT,
    "partner_site_url" TEXT,
    "is_visible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "display_order" SERIAL NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "mediaId" INTEGER NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "exhibitorId" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "connection_type" "ConnectionTypeEnum" NOT NULL,
    "cateroty_id" INTEGER,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "catalogId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "ProductTypeEnum" NOT NULL,
    "manufacturer" TEXT,
    "brand" TEXT,
    "name" TEXT,
    "description" TEXT,
    "cost" DOUBLE PRECISION,
    "meta_tags" "MetaTagsEnum"[],
    "possibility_of_purchase" "PossibilityOfPurchaseEnum"[],
    "min_batch" INTEGER,
    "payment_method" "PaymentMethodEnum"[],
    "delivery_method" "DeliveryMethodEnum"[],
    "standards" "StandardEnum"[],
    "analogs" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "is_import_substitution" BOOLEAN NOT NULL DEFAULT false,
    "catalogId" INTEGER,
    "mediaId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partner_site_url" TEXT,
    "content_type" "MediaType" NOT NULL,
    "html_content" TEXT,
    "video_url" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "is_import_substitution" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_medias" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FeedbackToMedia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Exhibitor_login_key" ON "Exhibitor"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Exhibitor_inn_key" ON "Exhibitor"("inn");

-- CreateIndex
CREATE UNIQUE INDEX "Category_cateroty_id_key" ON "Category"("cateroty_id");

-- CreateIndex
CREATE UNIQUE INDEX "_medias_AB_unique" ON "_medias"("A", "B");

-- CreateIndex
CREATE INDEX "_medias_B_index" ON "_medias"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FeedbackToMedia_AB_unique" ON "_FeedbackToMedia"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedbackToMedia_B_index" ON "_FeedbackToMedia"("B");

-- AddForeignKey
ALTER TABLE "Exhibitor" ADD CONSTRAINT "Exhibitor_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exhibitor" ADD CONSTRAINT "Exhibitor_mail_logoId_fkey" FOREIGN KEY ("mail_logoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exhibitor" ADD CONSTRAINT "Exhibitor_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_cateroty_id_fkey" FOREIGN KEY ("cateroty_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_medias" ADD CONSTRAINT "_medias_A_fkey" FOREIGN KEY ("A") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_medias" ADD CONSTRAINT "_medias_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToMedia" ADD CONSTRAINT "_FeedbackToMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToMedia" ADD CONSTRAINT "_FeedbackToMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
