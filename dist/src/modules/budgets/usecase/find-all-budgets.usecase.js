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
var FindAllBudgetsUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllBudgetsUseCase = void 0;
const common_1 = require("@nestjs/common");
const budget_repository_interface_1 = require("../repo/budget.repository.interface");
let FindAllBudgetsUseCase = FindAllBudgetsUseCase_1 = class FindAllBudgetsUseCase {
    constructor(budgetRepository) {
        this.budgetRepository = budgetRepository;
        this.logger = new common_1.Logger(FindAllBudgetsUseCase_1.name);
    }
    async execute() {
        this.logger.log('Buscando todos os orçamentos');
        const budgets = await this.budgetRepository.findAll();
        this.logger.log(`Encontrados ${budgets.length} orçamentos`);
        return budgets;
    }
};
exports.FindAllBudgetsUseCase = FindAllBudgetsUseCase;
exports.FindAllBudgetsUseCase = FindAllBudgetsUseCase = FindAllBudgetsUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [budget_repository_interface_1.BudgetRepositoryInterface])
], FindAllBudgetsUseCase);
//# sourceMappingURL=find-all-budgets.usecase.js.map