import { CreateTeamMemberController } from './create.team.controller';
import { DeleteTeamMemberController } from './delete.team.controller';
import { FindAllTeamMembersController } from './findAll.team.controller';
import { FindByIdTeamMemberController } from './findById.team.controller';
import { UpdateTeamMemberController } from './update.team.controller';
export declare const TeamController: (typeof FindAllTeamMembersController | typeof CreateTeamMemberController | typeof FindByIdTeamMemberController | typeof DeleteTeamMemberController | typeof UpdateTeamMemberController)[];
