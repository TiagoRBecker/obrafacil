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
var FindBudgetByIdUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindBudgetByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const budget_repository_interface_1 = require("../repo/budget.repository.interface");
let FindBudgetByIdUseCase = FindBudgetByIdUseCase_1 = class FindBudgetByIdUseCase {
    constructor(budgetRepository) {
        this.budgetRepository = budgetRepository;
        this.logger = new common_1.Logger(FindBudgetByIdUseCase_1.name);
    }
    async execute(id) {
        this.logger.log(`Buscando orçamento por ID: ${id}`);
        const budget = await this.budgetRepository.findById(id);
        if (!budget) {
            this.logger.error(`Orçamento não encontrado - ID: ${id}`);
            throw new common_1.NotFoundException('Budget not found.');
        }
        this.logger.log(`Orçamento encontrado - ID: ${id}`);
        return budget;
    }
};
exports.FindBudgetByIdUseCase = FindBudgetByIdUseCase;
exports.FindBudgetByIdUseCase = FindBudgetByIdUseCase = FindBudgetByIdUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [budget_repository_interface_1.BudgetRepositoryInterface])
], FindBudgetByIdUseCase);
//# sourceMappingURL=find-budget-by-id.usecase.js.map