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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdBudgetsController = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const find_budget_by_id_usecase_1 = require("../usecase/find-budget-by-id.usecase");
const types_1 = require("../../../../decorators/types");
const decorators_1 = require("../../../../decorators");
const budget_id_param_dto_1 = require("../dto/budget-id-param.dto");
let FindByIdBudgetsController = class FindByIdBudgetsController {
    constructor(findBudgetByIdUseCase) {
        this.findBudgetByIdUseCase = findBudgetByIdUseCase;
    }
    findById(params) {
        return this.findBudgetByIdUseCase.execute(params.id);
    }
};
exports.FindByIdBudgetsController = FindByIdBudgetsController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('order:read'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [budget_id_param_dto_1.BudgetIdParamDto]),
    __metadata("design:returntype", Promise)
], FindByIdBudgetsController.prototype, "findById", null);
exports.FindByIdBudgetsController = FindByIdBudgetsController = __decorate([
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/budgets'),
    __metadata("design:paramtypes", [find_budget_by_id_usecase_1.FindBudgetByIdUseCase])
], FindByIdBudgetsController);
//# sourceMappingURL=findById.budget.controller.js.map