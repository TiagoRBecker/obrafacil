/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `businessName` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_settingsId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_organizationId_fkey";

-- DropIndex
DROP INDEX "Settings_email_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "organizationId",
ADD COLUMN     "settingsId" UUID;

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "createdAt",
DROP COLUMN "name",
ADD COLUMN     "businessName" TEXT NOT NULL,
ALTER COLUMN "proposalValidityDays" SET DEFAULT 7,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "organizationId";

-- DropTable
DROP TABLE "Organization";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
