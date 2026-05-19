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
exports.BudgetsController = void 0;
const common_1 = require("@nestjs/common");
const create_budget_dto_1 = require("./dto/create-budget.dto");
const budget_id_param_dto_1 = require("./dto/budget-id-param.dto");
const budgets_service_1 = require("./budgets.service");
const admin_token_guard_1 = require("../../guards/admin-token.guard");
const decorators_1 = require("../../../decorators");
const types_1 = require("../../../decorators/types");
let BudgetsController = class BudgetsController {
    constructor(budgetsService) {
        this.budgetsService = budgetsService;
    }
    create(body) {
        return this.budgetsService.create(body);
    }
    update(params, body) {
        return this.budgetsService.update(params.id, body);
    }
    delete(params) {
        return this.budgetsService.delete(params.id);
    }
    findAll() {
        return this.budgetsService.findAll();
    }
    findById(params) {
        return this.budgetsService.findById(params.id);
    }
};
exports.BudgetsController = BudgetsController;
__decorate([
    (0, common_1.Post)('create'),
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('order:create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_budget_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "create", null);
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('order:update'),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [budget_id_param_dto_1.BudgetIdParamDto,
        create_budget_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('order:delete'),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [budget_id_param_dto_1.BudgetIdParamDto]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "delete", null);
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('order:read'),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('order:read'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [budget_id_param_dto_1.BudgetIdParamDto]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "findById", null);
exports.BudgetsController = BudgetsController = __decorate([
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/budgets'),
    __metadata("design:paramtypes", [budgets_service_1.BudgetsService])
], BudgetsController);
//# sourceMappingURL=budgets.controller.js.map