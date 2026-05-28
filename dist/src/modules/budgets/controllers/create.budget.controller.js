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
exports.CreateBudgetsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const create_budget_usecase_1 = require("../usecase/create-budget.usecase");
const decorators_1 = require("../../../../decorators");
const create_budget_dto_1 = require("../dto/create-budget.dto");
const types_1 = require("../../../../decorators/types");
let CreateBudgetsController = class CreateBudgetsController {
    constructor(createBudgetUseCase) {
        this.createBudgetUseCase = createBudgetUseCase;
    }
    create(body) {
        return this.createBudgetUseCase.execute(body);
    }
};
exports.CreateBudgetsController = CreateBudgetsController;
__decorate([
    (0, common_1.Post)('create'),
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('order:create'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar orçamento',
        description: 'Cria um novo orçamento com dados do cliente, serviços, materiais, datas e valores. Requer permissão `order:create` e papel ADMIN.',
    }),
    (0, swagger_1.ApiBody)({ type: create_budget_dto_1.CreateOrderDto, description: 'Dados completos do orçamento' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Orçamento criado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token de acesso ausente ou inválido.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Permissão negada. Requer papel ADMIN e permissão order:create.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_budget_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], CreateBudgetsController.prototype, "create", null);
exports.CreateBudgetsController = CreateBudgetsController = __decorate([
    (0, swagger_1.ApiTags)('Orçamentos'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/budgets'),
    __metadata("design:paramtypes", [create_budget_usecase_1.CreateBudgetUseCase])
], CreateBudgetsController);
//# sourceMappingURL=create.budget.controller.js.map