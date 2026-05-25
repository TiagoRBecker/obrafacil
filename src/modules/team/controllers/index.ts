import { CreateTeamMemberController } from './create.team.controller';
import { DeleteTeamMemberController } from './delete.team.controller';
import { FindAllTeamMembersController } from './findAll.team.controller';
import { FindByIdTeamMemberController } from './findById.team.controller';
import { UpdateTeamMemberController } from './update.team.controller';

export const TeamController = [
  CreateTeamMemberController,
  FindAllTeamMembersController,
  FindByIdTeamMemberController,
  DeleteTeamMemberController,
  UpdateTeamMemberController,
];
