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
exports.BudgetsService = void 0;
const common_1 = require("@nestjs/common");
const create_budget_usecase_1 = require("./usecase/create-budget.usecase");
const delete_budget_usecase_1 = require("./usecase/delete-budget.usecase");
const find_all_budgets_usecase_1 = require("./usecase/find-all-budgets.usecase");
const find_budget_by_id_usecase_1 = require("./usecase/find-budget-by-id.usecase");
const update_budget_usecase_1 = require("./usecase/update-budget.usecase");
let BudgetsService = class BudgetsService {
    constructor(createBudgetUseCase, updateBudgetUseCase, findBudgetByIdUseCase, findAllBudgetsUseCase, deleteBudgetUseCase) {
        this.createBudgetUseCase = createBudgetUseCase;
        this.updateBudgetUseCase = updateBudgetUseCase;
        this.findBudgetByIdUseCase = findBudgetByIdUseCase;
        this.findAllBudgetsUseCase = findAllBudgetsUseCase;
        this.deleteBudgetUseCase = deleteBudgetUseCase;
    }
    create(input) {
        return this.createBudgetUseCase.execute(input);
    }
    update(id, input) {
        return this.updateBudgetUseCase.execute(id, input);
    }
    findById(id) {
        return this.findBudgetByIdUseCase.execute(id);
    }
    findAll() {
        return this.findAllBudgetsUseCase.execute();
    }
    delete(id) {
        return this.deleteBudgetUseCase.execute(id);
    }
};
exports.BudgetsService = BudgetsService;
exports.BudgetsService = BudgetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_budget_usecase_1.CreateBudgetUseCase,
        update_budget_usecase_1.UpdateBudgetUseCase,
        find_budget_by_id_usecase_1.FindBudgetByIdUseCase,
        find_all_budgets_usecase_1.FindAllBudgetsUseCase,
        delete_budget_usecase_1.DeleteBudgetUseCase])
], BudgetsService);
//# sourceMappingURL=budgets.service.js.map