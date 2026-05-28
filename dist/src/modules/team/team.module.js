"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModule = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../guards/admin-token.guard");
const mock_team_member_repository_1 = require("./repo/mock-team-member.repository");
const team_member_repository_1 = require("./repo/team-member.repository");
const controllers_1 = require("./controllers");
const team_service_1 = require("./team.service");
const create_team_member_usecase_1 = require("./usecase/create-team-member.usecase");
const delete_team_member_usecase_1 = require("./usecase/delete-team-member.usecase");
const find_all_team_members_usecase_1 = require("./usecase/find-all-team-members.usecase");
const find_team_member_by_id_usecase_1 = require("./usecase/find-team-member-by-id.usecase");
const update_team_member_usecase_1 = require("./usecase/update-team-member.usecase");
const team_repo_1 = require("./repo/team-repo");
const prisma_1 = require("../../db/prisma");
const user_module_1 = require("../users/user.module");
let TeamModule = class TeamModule {
};
exports.TeamModule = TeamModule;
exports.TeamModule = TeamModule = __decorate([
    (0, common_1.Module)({
        controllers: [...controllers_1.TeamController],
        imports: [user_module_1.UserModule],
        providers: [
            team_service_1.TeamService,
            create_team_member_usecase_1.CreateTeamMemberUseCase,
            update_team_member_usecase_1.UpdateTeamMemberUseCase,
            find_team_member_by_id_usecase_1.FindTeamMemberByIdUseCase,
            find_all_team_members_usecase_1.FindAllTeamMembersUseCase,
            delete_team_member_usecase_1.DeleteTeamMemberUseCase,
            prisma_1.PrismaService,
            admin_token_guard_1.AdminTokenGuard,
            mock_team_member_repository_1.MockTeamMemberRepository,
            {
                provide: team_member_repository_1.TeamMemberRepositoryInterface,
                useClass: team_repo_1.TeamRepo,
            },
        ],
    })
], TeamModule);
//# sourceMappingURL=team.module.js.map