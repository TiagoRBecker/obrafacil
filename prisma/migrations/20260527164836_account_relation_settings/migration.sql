-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "settingsId" UUID;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
