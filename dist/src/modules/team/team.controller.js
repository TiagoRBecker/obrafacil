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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../guards/admin-token.guard");
const create_team_member_dto_1 = require("./dto/create-team-member.dto");
const team_member_id_param_dto_1 = require("./dto/team-member-id-param.dto");
const update_team_member_dto_1 = require("./dto/update-team-member.dto");
const team_service_1 = require("./team.service");
const decorators_1 = require("../../../decorators");
const types_1 = require("../../../decorators/types");
let TeamController = class TeamController {
    constructor(teamService) {
        this.teamService = teamService;
    }
    create(body) {
        return this.teamService.create(body);
    }
    update(params, body) {
        return this.teamService.update(params.id, body);
    }
    delete(params) {
        return this.teamService.delete(params.id);
    }
    findAll() {
        return this.teamService.findAll();
    }
    findById(params) {
        return this.teamService.findById(params.id);
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Post)('create'),
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('team:create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_member_dto_1.CreateTeamMemberDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "create", null);
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('team:update'),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_member_id_param_dto_1.TeamMemberIdParamDto,
        update_team_member_dto_1.UpdateTeamMemberDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_member_id_param_dto_1.TeamMemberIdParamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "delete", null);
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('team:read'),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('team:read'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_member_id_param_dto_1.TeamMemberIdParamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "findById", null);
exports.TeamController = TeamController = __decorate([
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/team'),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamController);
//# sourceMappingURL=team.controller.js.map