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
exports.FindAllBudgetsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const find_all_budgets_usecase_1 = require("../usecase/find-all-budgets.usecase");
const types_1 = require("../../../../decorators/types");
const decorators_1 = require("../../../../decorators");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
let FindAllBudgetsController = class FindAllBudgetsController {
    constructor(findAllBudgetsUseCase) {
        this.findAllBudgetsUseCase = findAllBudgetsUseCase;
    }
    findAll(query) {
        return this.findAllBudgetsUseCase.execute(query.page, query.limit);
    }
};
exports.FindAllBudgetsController = FindAllBudgetsController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('order:read'),
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar orçamentos (paginado)',
        description: 'Retorna orçamentos cadastrados com paginação. Requer permissão `order:read`. Disponível para ADMIN e USER.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista paginada de orçamentos retornada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token de acesso ausente ou inválido.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], FindAllBudgetsController.prototype, "findAll", null);
exports.FindAllBudgetsController = FindAllBudgetsController = __decorate([
    (0, swagger_1.ApiTags)('Orçamentos'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/budgets'),
    __metadata("design:paramtypes", [find_all_budgets_usecase_1.FindAllBudgetsUseCase])
], FindAllBudgetsController);
//# sourceMappingURL=findAll.budget.controller.js.map