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
var CreateBudgetUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBudgetUseCase = void 0;
const common_1 = require("@nestjs/common");
const budget_entity_1 = require("../entity/budget.entity");
const budget_repository_interface_1 = require("../repo/budget.repository.interface");
const customer_repo_inteface_1 = require("../../customers/repo/customer.repo.inteface");
let CreateBudgetUseCase = CreateBudgetUseCase_1 = class CreateBudgetUseCase {
    constructor(budgetRepository, customerRepo) {
        this.budgetRepository = budgetRepository;
        this.customerRepo = customerRepo;
        this.logger = new common_1.Logger(CreateBudgetUseCase_1.name);
    }
    async execute(input) {
        this.logger.log(`Iniciando criação de orçamento para cliente: ${input.customerId}`);
        const existCustomer = await this.customerRepo.findById(input.customerId);
        if (!existCustomer?.id) {
            this.logger.error(`Cliente não encontrado - ID: ${input.customerId}`);
            throw new common_1.NotFoundException(`Usuario nao encontrado `);
        }
        const orderInitiDate = await this.budgetRepository.findByCustomerAndStartDate(existCustomer.id, input.initDate);
        if (orderInitiDate?.id) {
            this.logger.warn(`Conflito: cliente já possui obra agendada na data: ${input.initDate}`);
            throw new common_1.ConflictException('O cliente ja possui uma obra  agendada com essa data inicial!');
        }
        try {
            this.logger.log(`Criando orçamento - nome: ${input.name}`);
            const budget = budget_entity_1.BudgetEntity.create({
                name: input.name,
                phone: input.phone,
                address: input.address,
                observations: input.observations,
                title: input.title,
                description: input.description,
                valueHour: input.valueHour,
                estimatedHours: input.estimatedHours,
                numberEmployees: input.numberEmployees,
                typeCharge: input.typeCharge,
                materials: input.materials,
                discount: input.discount,
                initDate: new Date(input.initDate),
                endDate: new Date(input.endDate),
                validityDate: new Date(input.validityDate),
                finalObservations: input.finalObservations,
                laborValue: input.laborValue,
                materialValue: input.materialValue,
                totalValue: input.totalValue,
                customerId: existCustomer.id,
            });
            const createdBudget = await this.budgetRepository.create(budget);
            this.logger.log(`Orçamento criado com sucesso - ID: ${createdBudget.id}`);
            return createdBudget;
        }
        catch (error) {
            this.logger.error(`Erro ao criar orçamento: ${error.message || error}`);
            throw new common_1.BadRequestException('Erro a criar a ordem de serviço ');
        }
    }
};
exports.CreateBudgetUseCase = CreateBudgetUseCase;
exports.CreateBudgetUseCase = CreateBudgetUseCase = CreateBudgetUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [budget_repository_interface_1.BudgetRepositoryInterface,
        customer_repo_inteface_1.CustomerRepositoryInterface])
], CreateBudgetUseCase);
//# sourceMappingURL=create-budget.usecase.js.map