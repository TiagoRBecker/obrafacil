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
exports.FindAllTeamMembersController = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const find_all_team_members_usecase_1 = require("../usecase/find-all-team-members.usecase");
const decorators_1 = require("../../../../decorators");
const types_1 = require("../../../../decorators/types");
let FindAllTeamMembersController = class FindAllTeamMembersController {
    constructor(findAllTeamMembersUseCase) {
        this.findAllTeamMembersUseCase = findAllTeamMembersUseCase;
    }
    findAll() {
        return this.findAllTeamMembersUseCase.execute();
    }
};
exports.FindAllTeamMembersController = FindAllTeamMembersController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('team:read'),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FindAllTeamMembersController.prototype, "findAll", null);
exports.FindAllTeamMembersController = FindAllTeamMembersController = __decorate([
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/team'),
    __metadata("design:paramtypes", [find_all_team_members_usecase_1.FindAllTeamMembersUseCase])
], FindAllTeamMembersController);
//# sourceMappingURL=findAll.team.controller.js.map