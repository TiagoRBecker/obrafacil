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
exports.DeleteTeamMemberController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const team_member_id_param_dto_1 = require("../dto/team-member-id-param.dto");
const delete_team_member_usecase_1 = require("../usecase/delete-team-member.usecase");
const decorators_1 = require("../../../../decorators");
const types_1 = require("../../../../decorators/types");
let DeleteTeamMemberController = class DeleteTeamMemberController {
    constructor(deleteTeamMemberUseCase) {
        this.deleteTeamMemberUseCase = deleteTeamMemberUseCase;
    }
    delete(params) {
        return this.deleteTeamMemberUseCase.execute(params.id);
    }
};
exports.DeleteTeamMemberController = DeleteTeamMemberController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Excluir membro da equipe',
        description: 'Remove um membro da equipe do sistema pelo seu ID. Requer papel ADMIN.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID único do membro da equipe a ser excluído', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Membro da equipe excluído com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Membro da equipe não encontrado.' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_member_id_param_dto_1.TeamMemberIdParamDto]),
    __metadata("design:returntype", Promise)
], DeleteTeamMemberController.prototype, "delete", null);
exports.DeleteTeamMemberController = DeleteTeamMemberController = __decorate([
    (0, swagger_1.ApiTags)('Equipe'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/team'),
    __metadata("design:paramtypes", [delete_team_member_usecase_1.DeleteTeamMemberUseCase])
], DeleteTeamMemberController);
//# sourceMappingURL=delete.team.controller.js.map