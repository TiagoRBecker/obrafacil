"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetRepo = void 0;
const common_1 = require("@nestjs/common");
const budget_entity_1 = require("../entity/budget.entity");
const budget_repository_interface_1 = require("./budget.repository.interface");
const prisma_1 = require("../../../db/prisma");
let BudgetRepo = class BudgetRepo extends budget_repository_interface_1.BudgetRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async create(budget) {
        const created = await this.prisma.order.create({
            data: {
                title: budget.title,
                description: budget.description,
                customerId: budget.customerId,
                materials: { create: budget.materials },
                address: budget.address,
                endDate: budget.endDate,
                estimatedHours: budget.estimatedHours,
                finalObservations: budget.finalObservations,
                initDate: budget.initDate,
                name: budget.name,
                numberEmployees: budget.numberEmployees,
                observations: budget.observations,
                phone: budget.phone,
                typeCharge: budget.typeCharge,
                validityDate: budget.validityDate,
                valueHour: budget.valueHour,
                discount: budget.discount,
                laborValue: budget.laborValue,
                totalValue: budget.totalValue,
                materialValue: budget.materialValue,
            },
            include: { materials: true },
        });
        return budget_entity_1.BudgetEntity.create({
            ...created,
            typeCharge: created.typeCharge,
            initDate: created.initDate,
            endDate: created.endDate,
            validityDate: created.validityDate,
            discount: created.discount ?? 0,
            laborValue: created.laborValue ?? 0,
            totalValue: created.totalValue ?? 0,
            materialValue: created.materialValue ?? 0,
            customerId: created.customerId ?? '',
        });
    }
    async findAll(skip, take) {
        const [data, total] = await this.prisma.$transaction([
            this.prisma.order.findMany({
                skip,
                take,
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    address: true,
                    observations: true,
                    title: true,
                    description: true,
                    valueHour: true,
                    estimatedHours: true,
                    numberEmployees: true,
                    typeCharge: true,
                    updatedAt: true,
                    customerId: true,
                    materials: true,
                    initDate: true,
                    endDate: true,
                    validityDate: true,
                    totalValue: true,
                    laborValue: true,
                    materialValue: true,
                    discount: true,
                    finalObservations: true,
                    createdAt: true,
                    status: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.order.count(),
        ]);
        return {
            data: data.map((order) => budget_entity_1.BudgetEntity.toDTO({
                ...order,
                laborValue: order.laborValue ?? 0,
                materialValue: order.materialValue ?? 0,
                totalValue: order.totalValue ?? 0,
                discount: order.discount ?? 0,
                customerId: order.customerId ?? '',
                status: order.status ?? '',
            })),
            total,
        };
    }
    async findByCustomerAndStartDate(customerId, date) {
        const order = await this.prisma.order.findUnique({
            where: { customerId_initDate: { customerId, initDate: date } },
            include: { materials: true },
        });
        if (!order)
            return null;
        return budget_entity_1.BudgetEntity.toDTO({
            ...order,
            address: order.address,
            description: order.description,
            endDate: order.endDate,
            estimatedHours: order.estimatedHours,
            finalObservations: order.finalObservations,
            materials: order.materials,
            laborValue: order.laborValue ?? 0,
            materialValue: order.materialValue ?? 0,
            totalValue: order.totalValue ?? 0,
            discount: order.discount ?? 0,
            customerId: order.customerId ?? '',
        });
    }
    async findById(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                materials: true,
                customer: { select: { phone: true } },
            },
        });
        if (!order)
            return null;
        return budget_entity_1.BudgetEntity.toDTO({
            ...order,
            id: order.id,
            laborValue: order.laborValue ?? 0,
            materialValue: order.materialValue ?? 0,
            totalValue: order.totalValue ?? 0,
            discount: order.discount ?? 0,
            customerId: order.customerId ?? '',
            materials: order.materials,
            phone: order.customer?.phone,
        });
    }
    async update(id, budget) {
        const updated = await this.prisma.order.update({
            where: { id },
            data: {
                finalObservations: budget.finalObservations,
                name: budget.name,
                observations: budget.observations,
                address: budget.address,
                title: budget.title,
                valueHour: budget.valueHour,
                description: budget.description,
                estimatedHours: budget.estimatedHours,
                numberEmployees: budget.numberEmployees,
                typeCharge: budget.typeCharge,
                initDate: budget.initDate,
                endDate: budget.endDate,
                validityDate: budget.validityDate,
                discount: budget.discount,
                laborValue: budget.laborValue,
                totalValue: budget.totalValue,
                materialValue: budget.materialValue,
                materials: {
                    deleteMany: {},
                    createMany: { data: budget.materials },
                },
            },
            include: { materials: true },
        });
        return budget_entity_1.BudgetEntity.toDTO({
            ...updated,
            materials: updated.materials,
        });
    }
    async updateStatus(id) {
        await this.prisma.order.update({
            where: { id },
            data: { status: 'ENVIADO' },
        });
    }
    async createTrackingMessage(messageId, orderId) {
        await this.prisma.messageTracking.create({
            data: { messageId, orderId },
        });
    }
    async findMessageTracking(messageId) {
        return this.prisma.messageTracking.findUnique({
            where: { messageId },
        });
    }
    async delete(id) {
        await this.prisma.order.delete({ where: { id } });
    }
};
exports.BudgetRepo = BudgetRepo;
exports.BudgetRepo = BudgetRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], BudgetRepo);
//# sourceMappingURL=budgets.repo.js.map