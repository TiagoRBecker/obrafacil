import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { FindAllTeamMembersUseCase } from '../usecase/find-all-team-members.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class FindAllTeamMembersController {
  constructor(private readonly findAllTeamMembersUseCase: FindAllTeamMembersUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('team:read')
  @Get('all')
  findAll(): Promise<TeamMemberResponseDto[]> {
    return this.findAllTeamMembersUseCase.execute();
  }
}
