-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" UUID,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "service" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'FREE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_orders" (
    "id" UUID NOT NULL,
    "teamId" UUID NOT NULL,
    "orderId" UUID NOT NULL,

    CONSTRAINT "team_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" UUID NOT NULL,
    "businessName" TEXT,
    "specialty" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "logoUrl" TEXT,
    "proposalTerms" TEXT,
    "warrantyTerms" TEXT,
    "proposalValidityDays" INTEGER NOT NULL DEFAULT 7,
    "defaultBillingUnit" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "typeCharge" TEXT NOT NULL,
    "valueHour" DOUBLE PRECISION NOT NULL,
    "estimatedHours" DOUBLE PRECISION NOT NULL,
    "numberEmployees" INTEGER NOT NULL,
    "finalObservations" TEXT NOT NULL,
    "initDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "validityDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" UUID,
    "totalValue" DOUBLE PRECISION DEFAULT 0,
    "materialValue" DOUBLE PRECISION DEFAULT 0,
    "discount" DOUBLE PRECISION DEFAULT 0,
    "laborValue" DOUBLE PRECISION DEFAULT 0,
    "status" TEXT DEFAULT 'PENDENTE',

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageTracking" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "MessageTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_materials" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Team_email_key" ON "Team"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Team_phone_key" ON "Team"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "team_orders_teamId_orderId_key" ON "team_orders"("teamId", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_customerId_initDate_key" ON "orders"("customerId", "initDate");

-- CreateIndex
CREATE UNIQUE INDEX "MessageTracking_orderId_key" ON "MessageTracking"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageTracking_messageId_key" ON "MessageTracking"("messageId");

-- CreateIndex
CREATE INDEX "order_materials_orderId_idx" ON "order_materials"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_orders" ADD CONSTRAINT "team_orders_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_orders" ADD CONSTRAINT "team_orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_materials" ADD CONSTRAINT "order_materials_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
