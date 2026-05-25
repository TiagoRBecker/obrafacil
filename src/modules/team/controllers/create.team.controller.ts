import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CreateTeamMemberDto } from '../dto/create-team-member.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { CreateTeamMemberUseCase } from '../usecase/create-team-member.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class CreateTeamMemberController {
  constructor(private readonly createTeamMemberUseCase: CreateTeamMemberUseCase) {}

  @Post('create')
  @Roles(UserRole.ADMIN)
  @RequirePermissions('team:create')
  create(@Body() body: CreateTeamMemberDto): Promise<TeamMemberResponseDto> {
    return this.createTeamMemberUseCase.execute(body);
  }
}
