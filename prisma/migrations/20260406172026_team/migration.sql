/*
  Warnings:

  - You are about to drop the column `role` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "role",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'FREE';

-- CreateTable
CREATE TABLE "team_orders" (
    "id" UUID NOT NULL,
    "teamId" UUID NOT NULL,
    "orderId" UUID NOT NULL,

    CONSTRAINT "team_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_orders_teamId_orderId_key" ON "team_orders"("teamId", "orderId");

-- AddForeignKey
ALTER TABLE "team_orders" ADD CONSTRAINT "team_orders_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_orders" ADD CONSTRAINT "team_orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
