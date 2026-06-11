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
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const get_metrics_usecase_1 = require("../usecase/get-metrics.usecase");
const metrics_response_dto_1 = require("../dto/metrics-response.dto");
const decorators_1 = require("../../../../decorators");
const types_1 = require("../../../../decorators/types");
let MetricsController = class MetricsController {
    constructor(getMetricsUseCase) {
        this.getMetricsUseCase = getMetricsUseCase;
    }
    async execute() {
        return this.getMetricsUseCase.execute();
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('order:read'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter métricas do dashboard',
        description: 'Retorna contagens agregadas de clientes, orçamentos e membros da equipe. Requer permissão `order:read`.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Métricas retornadas com sucesso.',
        type: metrics_response_dto_1.MetricsResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token de acesso ausente ou inválido.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "execute", null);
exports.MetricsController = MetricsController = __decorate([
    (0, swagger_1.ApiTags)('Métricas'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/metrics'),
    __metadata("design:paramtypes", [get_metrics_usecase_1.GetMetricsUseCase])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map