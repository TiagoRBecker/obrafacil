import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { TeamMemberIdParamDto } from '../dto/team-member-id-param.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { UpdateTeamMemberDto } from '../dto/update-team-member.dto';
import { UpdateTeamMemberUseCase } from '../usecase/update-team-member.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class UpdateTeamMemberController {
  constructor(private readonly updateTeamMemberUseCase: UpdateTeamMemberUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('team:update')
  @Patch('update/:id')
  update(
    @Param() params: TeamMemberIdParamDto,
    @Body() body: UpdateTeamMemberDto,
  ): Promise<TeamMemberResponseDto> {
    return this.updateTeamMemberUseCase.execute(params.id, body);
  }
}
