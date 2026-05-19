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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const create_team_member_usecase_1 = require("./usecase/create-team-member.usecase");
const delete_team_member_usecase_1 = require("./usecase/delete-team-member.usecase");
const find_all_team_members_usecase_1 = require("./usecase/find-all-team-members.usecase");
const find_team_member_by_id_usecase_1 = require("./usecase/find-team-member-by-id.usecase");
const update_team_member_usecase_1 = require("./usecase/update-team-member.usecase");
let TeamService = class TeamService {
    constructor(createTeamMemberUseCase, updateTeamMemberUseCase, findTeamMemberByIdUseCase, findAllTeamMembersUseCase, deleteTeamMemberUseCase) {
        this.createTeamMemberUseCase = createTeamMemberUseCase;
        this.updateTeamMemberUseCase = updateTeamMemberUseCase;
        this.findTeamMemberByIdUseCase = findTeamMemberByIdUseCase;
        this.findAllTeamMembersUseCase = findAllTeamMembersUseCase;
        this.deleteTeamMemberUseCase = deleteTeamMemberUseCase;
    }
    create(input) {
        return this.createTeamMemberUseCase.execute(input);
    }
    update(id, input) {
        return this.updateTeamMemberUseCase.execute(id, input);
    }
    findById(id) {
        return this.findTeamMemberByIdUseCase.execute(id);
    }
    findAll() {
        return this.findAllTeamMembersUseCase.execute();
    }
    delete(id) {
        return this.deleteTeamMemberUseCase.execute(id);
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_team_member_usecase_1.CreateTeamMemberUseCase,
        update_team_member_usecase_1.UpdateTeamMemberUseCase,
        find_team_member_by_id_usecase_1.FindTeamMemberByIdUseCase,
        find_all_team_members_usecase_1.FindAllTeamMembersUseCase,
        delete_team_member_usecase_1.DeleteTeamMemberUseCase])
], TeamService);
//# sourceMappingURL=team.service.js.map