/*
  Warnings:

  - You are about to drop the column `aboutData` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `contactData` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `heroData` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `projectsData` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `skillsData` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Theme` table. All the data in the column will be lost.
  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "CustomSection" DROP CONSTRAINT "CustomSection_sectionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "CustomSection" DROP CONSTRAINT "CustomSection_userId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateSection" DROP CONSTRAINT "TemplateSection_sectionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateSection" DROP CONSTRAINT "TemplateSection_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_userId_fkey";

-- DropIndex
DROP INDEX "Theme_userId_idx";

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "aboutData",
DROP COLUMN "contactData",
DROP COLUMN "heroData",
DROP COLUMN "projectsData",
DROP COLUMN "skillsData";

-- AlterTable
ALTER TABLE "Theme" DROP COLUMN "userId";

-- DropTable
DROP TABLE "Asset";

-- DropTable
DROP TABLE "CustomSection";

-- DropTable
DROP TABLE "TemplateSection";
