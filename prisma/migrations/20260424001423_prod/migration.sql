-- CreateTable
CREATE TABLE "MessageTracking" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "MessageTracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageTracking_orderId_key" ON "MessageTracking"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageTracking_messageId_key" ON "MessageTracking"("messageId");
