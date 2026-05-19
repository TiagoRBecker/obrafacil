"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetsModule = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../guards/admin-token.guard");
const budgets_controller_1 = require("./budgets.controller");
const budgets_service_1 = require("./budgets.service");
const mock_budget_repository_1 = require("./repo/mock-budget.repository");
const budget_repository_interface_1 = require("./repo/budget.repository.interface");
const create_budget_usecase_1 = require("./usecase/create-budget.usecase");
const delete_budget_usecase_1 = require("./usecase/delete-budget.usecase");
const find_all_budgets_usecase_1 = require("./usecase/find-all-budgets.usecase");
const find_budget_by_id_usecase_1 = require("./usecase/find-budget-by-id.usecase");
const update_budget_usecase_1 = require("./usecase/update-budget.usecase");
const budgets_repo_1 = require("./repo/budgets.repo");
const prisma_1 = require("../../db/prisma");
const customers_module_1 = require("../customers/customers.module");
const update_status_order_usecase_1 = require("./usecase/update-status-order.usecase");
let BudgetsModule = class BudgetsModule {
};
exports.BudgetsModule = BudgetsModule;
exports.BudgetsModule = BudgetsModule = __decorate([
    (0, common_1.Module)({
        controllers: [budgets_controller_1.BudgetsController],
        imports: [customers_module_1.CustomersModule],
        providers: [
            {
                provide: budget_repository_interface_1.BudgetRepositoryInterface,
                useClass: budgets_repo_1.BudgetRepo,
            },
            prisma_1.PrismaService,
            budgets_service_1.BudgetsService,
            create_budget_usecase_1.CreateBudgetUseCase,
            update_budget_usecase_1.UpdateBudgetUseCase,
            find_budget_by_id_usecase_1.FindBudgetByIdUseCase,
            find_all_budgets_usecase_1.FindAllBudgetsUseCase,
            delete_budget_usecase_1.DeleteBudgetUseCase,
            admin_token_guard_1.AdminTokenGuard,
            mock_budget_repository_1.MockBudgetRepository,
            update_status_order_usecase_1.UpdateOrderStatusUseCase,
        ],
        exports: [budget_repository_interface_1.BudgetRepositoryInterface, update_status_order_usecase_1.UpdateOrderStatusUseCase]
    })
], BudgetsModule);
//# sourceMappingURL=budgets.module.js.map