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
exports.UpdateTeamMemberController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const team_member_id_param_dto_1 = require("../dto/team-member-id-param.dto");
const update_team_member_dto_1 = require("../dto/update-team-member.dto");
const update_team_member_usecase_1 = require("../usecase/update-team-member.usecase");
const decorators_1 = require("../../../../decorators");
const types_1 = require("../../../../decorators/types");
let UpdateTeamMemberController = class UpdateTeamMemberController {
    constructor(updateTeamMemberUseCase) {
        this.updateTeamMemberUseCase = updateTeamMemberUseCase;
    }
    update(params, body) {
        return this.updateTeamMemberUseCase.execute(params.id, body);
    }
};
exports.UpdateTeamMemberController = UpdateTeamMemberController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('team:update'),
    (0, common_1.Patch)('update/:id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar membro da equipe',
        description: 'Atualiza os dados de um membro da equipe existente. Requer permissão `team:update` e papel ADMIN.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID único do membro da equipe a ser atualizado', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiBody)({ type: update_team_member_dto_1.UpdateTeamMemberDto, description: 'Dados atualizados do membro da equipe' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Membro da equipe atualizado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Membro da equipe não encontrado.' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_member_id_param_dto_1.TeamMemberIdParamDto,
        update_team_member_dto_1.UpdateTeamMemberDto]),
    __metadata("design:returntype", Promise)
], UpdateTeamMemberController.prototype, "update", null);
exports.UpdateTeamMemberController = UpdateTeamMemberController = __decorate([
    (0, swagger_1.ApiTags)('Equipe'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/team'),
    __metadata("design:paramtypes", [update_team_member_usecase_1.UpdateTeamMemberUseCase])
], UpdateTeamMemberController);
//# sourceMappingURL=update.team.controller.js.map