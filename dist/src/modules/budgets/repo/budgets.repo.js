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
var BudgetRepo_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetRepo = void 0;
const common_1 = require("@nestjs/common");
const budget_entity_1 = require("../entity/budget.entity");
const budget_repository_interface_1 = require("./budget.repository.interface");
const prisma_1 = require("../../../db/prisma");
let BudgetRepo = BudgetRepo_1 = class BudgetRepo extends budget_repository_interface_1.BudgetRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
        this.logger = new common_1.Logger(BudgetRepo_1.name);
    }
    async create(budget) {
        const { title, description, materials, address, discount, endDate, estimatedHours, finalObservations, initDate, name, numberEmployees, observations, phone, typeCharge, validityDate, valueHour, laborValue, materialValue, totalValue, customerId, } = budget;
        try {
            const create = await this.prisma.order.create({
                data: {
                    title,
                    description,
                    customerId,
                    materials: {
                        create: materials,
                    },
                    address,
                    endDate,
                    estimatedHours,
                    finalObservations,
                    initDate,
                    name,
                    numberEmployees,
                    observations,
                    phone,
                    typeCharge,
                    validityDate,
                    valueHour,
                    discount,
                    laborValue,
                    totalValue,
                    materialValue,
                },
                include: {
                    materials: true,
                },
            });
            const data = budget_entity_1.BudgetEntity.create({
                ...create,
                typeCharge: create.typeCharge,
                initDate: create.initDate,
                endDate: create.endDate,
                validityDate: create.validityDate,
                discount: create.discount,
                laborValue: create.laborValue,
                totalValue: create.totalValue,
                materialValue: create.materialValue,
                customerId: create.customerId,
            });
            this.logger.log('Ordem de serviço criada com sucesso ');
            return data;
        }
        catch (error) {
            this.logger.error('Erro ao criar orçamento no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async findAll() {
        try {
            const data = await this.prisma.order.findMany({
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
            });
            const mapper = data.map((order) => {
                return budget_entity_1.BudgetEntity.toDTO({
                    ...order,
                    laborValue: order.laborValue ?? 0,
                    materialValue: order.materialValue ?? 0,
                    totalValue: order.totalValue ?? 0,
                    discount: order.discount ?? 0,
                    customerId: order.customerId,
                    status: order.status,
                });
            });
            return mapper;
        }
        catch (error) {
            this.logger.error('Erro ao criar orçamento no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async findByCustomerAndStartDate(customerId, date) {
        try {
            const existOrderInitiDate = await this.prisma.order.findUnique({
                where: {
                    customerId_initDate: {
                        customerId,
                        initDate: date,
                    },
                },
                include: {
                    materials: true,
                },
            });
            return budget_entity_1.BudgetEntity.toDTO({
                ...existOrderInitiDate,
                address: existOrderInitiDate?.address,
                description: existOrderInitiDate?.description,
                endDate: existOrderInitiDate?.endDate,
                estimatedHours: existOrderInitiDate?.estimatedHours,
                finalObservations: existOrderInitiDate?.finalObservations,
                materials: existOrderInitiDate?.materials,
                laborValue: existOrderInitiDate?.laborValue ?? 0,
                materialValue: existOrderInitiDate?.materialValue ?? 0,
                totalValue: existOrderInitiDate?.totalValue ?? 0,
                discount: existOrderInitiDate?.discount ?? 0,
                customerId: existOrderInitiDate?.customerId,
            });
        }
        catch (error) {
            this.logger.error('Erro ao criar orçamento no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async findById(id) {
        try {
            const order = await this.prisma.order.findUnique({
                where: {
                    id,
                },
                include: {
                    materials: true,
                    customer: {
                        select: {
                            phone: true,
                        },
                    },
                },
            });
            return budget_entity_1.BudgetEntity.toDTO({
                ...order,
                id: order?.id,
                laborValue: order?.laborValue ?? 0,
                materialValue: order?.materialValue ?? 0,
                totalValue: order?.totalValue ?? 0,
                discount: order?.discount ?? 0,
                customerId: order?.customerId,
                materials: order?.materials,
                phone: order?.customer?.phone,
            });
        }
        catch (error) {
            this.logger.error('Erro ao criar orçamento no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async update(id, budget) {
        try {
            const update = await this.prisma.order.update({
                where: {
                    id,
                },
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
                        createMany: {
                            data: budget.materials,
                        },
                    },
                },
                include: {
                    materials: true,
                },
            });
            return budget_entity_1.BudgetEntity.toDTO({
                ...update,
                materials: update.materials,
            });
        }
        catch (error) {
            this.logger.error('Erro ao criar orçamento no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async updateStatus(id) {
        try {
            await this.prisma.order.update({
                where: { id },
                data: {
                    status: 'ENVIADO',
                },
            });
        }
        catch (error) {
            this.logger.error('Erro ao criar atualizar o status da ordem  no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async createTrackingMessage(messageId, orderId) {
        try {
            await this.prisma.messageTracking.create({
                data: {
                    messageId,
                    orderId,
                },
            });
            return;
        }
        catch (error) {
            this.logger.error('Erro ao criar  o tracker da message no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async findMessageTracking(messageId) {
        try {
            const track = await this.prisma.messageTracking.findUnique({
                where: {
                    messageId,
                },
            });
            return track;
        }
        catch (error) {
            this.logger.error('Erro ao criar  o tracker da message no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async delete(id) {
        try {
            await this.prisma.order.delete({ where: { id } });
            return;
        }
        catch (error) {
            this.logger.error('Erro ao deletar orçamento no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
};
exports.BudgetRepo = BudgetRepo;
exports.BudgetRepo = BudgetRepo = BudgetRepo_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], BudgetRepo);
//# sourceMappingURL=budgets.repo.js.map