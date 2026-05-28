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
exports.FindByIdTeamMemberController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const id_param_dto_1 = require("../../../common/dto/id-param.dto");
const find_team_member_by_id_usecase_1 = require("../usecase/find-team-member-by-id.usecase");
const decorators_1 = require("../../../../decorators");
const types_1 = require("../../../../decorators/types");
let FindByIdTeamMemberController = class FindByIdTeamMemberController {
    constructor(findTeamMemberByIdUseCase) {
        this.findTeamMemberByIdUseCase = findTeamMemberByIdUseCase;
    }
    findById(params) {
        return this.findTeamMemberByIdUseCase.execute(params.id);
    }
};
exports.FindByIdTeamMemberController = FindByIdTeamMemberController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('team:read'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar membro da equipe por ID',
        description: 'Retorna os dados de um membro da equipe específico. Requer permissão `team:read`. Disponível para ADMIN e USER.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID único do membro da equipe', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Membro da equipe encontrado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Membro da equipe não encontrado.' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_dto_1.IdParamDto]),
    __metadata("design:returntype", Promise)
], FindByIdTeamMemberController.prototype, "findById", null);
exports.FindByIdTeamMemberController = FindByIdTeamMemberController = __decorate([
    (0, swagger_1.ApiTags)('Equipe'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/team'),
    __metadata("design:paramtypes", [find_team_member_by_id_usecase_1.FindTeamMemberByIdUseCase])
], FindByIdTeamMemberController);
//# sourceMappingURL=findById.team.controller.js.map