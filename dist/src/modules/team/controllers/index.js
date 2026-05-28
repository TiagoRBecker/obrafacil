"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const create_team_controller_1 = require("./create.team.controller");
const delete_team_controller_1 = require("./delete.team.controller");
const findAll_team_controller_1 = require("./findAll.team.controller");
const findById_team_controller_1 = require("./findById.team.controller");
const update_team_controller_1 = require("./update.team.controller");
exports.TeamController = [
    create_team_controller_1.CreateTeamMemberController,
    findAll_team_controller_1.FindAllTeamMembersController,
    findById_team_controller_1.FindByIdTeamMemberController,
    delete_team_controller_1.DeleteTeamMemberController,
    update_team_controller_1.UpdateTeamMemberController,
];
//# sourceMappingURL=index.js.map