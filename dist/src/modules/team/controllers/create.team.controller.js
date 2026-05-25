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
exports.CreateTeamMemberController = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const create_team_member_dto_1 = require("../dto/create-team-member.dto");
const create_team_member_usecase_1 = require("../usecase/create-team-member.usecase");
const decorators_1 = require("../../../../decorators");
const types_1 = require("../../../../decorators/types");
let CreateTeamMemberController = class CreateTeamMemberController {
    constructor(createTeamMemberUseCase) {
        this.createTeamMemberUseCase = createTeamMemberUseCase;
    }
    create(body) {
        return this.createTeamMemberUseCase.execute(body);
    }
};
exports.CreateTeamMemberController = CreateTeamMemberController;
__decorate([
    (0, common_1.Post)('create'),
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN),
    (0, decorators_1.RequirePermissions)('team:create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_member_dto_1.CreateTeamMemberDto]),
    __metadata("design:returntype", Promise)
], CreateTeamMemberController.prototype, "create", null);
exports.CreateTeamMemberController = CreateTeamMemberController = __decorate([
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    (0, common_1.Controller)('admin/team'),
    __metadata("design:paramtypes", [create_team_member_usecase_1.CreateTeamMemberUseCase])
], CreateTeamMemberController);
//# sourceMappingURL=create.team.controller.js.map