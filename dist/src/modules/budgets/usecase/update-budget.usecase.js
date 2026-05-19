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
var UpdateBudgetUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBudgetUseCase = void 0;
const common_1 = require("@nestjs/common");
const budget_entity_1 = require("../entity/budget.entity");
const budget_repository_interface_1 = require("../repo/budget.repository.interface");
const customer_repo_inteface_1 = require("../../customers/repo/customer.repo.inteface");
let UpdateBudgetUseCase = UpdateBudgetUseCase_1 = class UpdateBudgetUseCase {
    constructor(budgetRepository, customerRepo) {
        this.budgetRepository = budgetRepository;
        this.customerRepo = customerRepo;
        this.logger = new common_1.Logger(UpdateBudgetUseCase_1.name);
    }
    async execute(id, input) {
        this.logger.log(`Iniciando atualização do orçamento - ID: ${id}`);
        const existCustomer = await this.customerRepo.findById(input.customerId);
        if (!existCustomer?.id) {
            this.logger.error(`Cliente não encontrado - ID: ${input.customerId}`);
            throw new common_1.NotFoundException(`Usuario nao encontrado `);
        }
        const currentBudget = await this.budgetRepository.findById(id);
        if (!currentBudget?.id) {
            this.logger.error(`Orçamento não encontrado - ID: ${id}`);
            throw new common_1.NotFoundException('Budget not found.');
        }
        try {
            this.logger.log(`Atualizando orçamento - nome: ${input.name}`);
            const current = currentBudget.toJSON();
            const budget = budget_entity_1.BudgetEntity.create({
                ...current,
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
            const savedBudget = await this.budgetRepository.update(currentBudget.id, budget);
            this.logger.log(`Orçamento atualizado com sucesso - ID: ${id}`);
            return savedBudget;
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar orçamento - ID: ${id}, erro: ${error?.message || error}`);
            throw new common_1.BadRequestException(`Erro ao  atualizar  a ordem de serviço ${id}`);
        }
    }
};
exports.UpdateBudgetUseCase = UpdateBudgetUseCase;
exports.UpdateBudgetUseCase = UpdateBudgetUseCase = UpdateBudgetUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [budget_repository_interface_1.BudgetRepositoryInterface,
        customer_repo_inteface_1.CustomerRepositoryInterface])
], UpdateBudgetUseCase);
//# sourceMappingURL=update-budget.usecase.js.map