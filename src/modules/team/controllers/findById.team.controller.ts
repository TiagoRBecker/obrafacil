import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { TeamMemberIdParamDto } from '../dto/team-member-id-param.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { FindTeamMemberByIdUseCase } from '../usecase/find-team-member-by-id.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class FindByIdTeamMemberController {
  constructor(private readonly findTeamMemberByIdUseCase: FindTeamMemberByIdUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('team:read')
  @Get(':id')
  findById(
    @Param() params: TeamMemberIdParamDto,
  ): Promise<TeamMemberResponseDto> {
    return this.findTeamMemberByIdUseCase.execute(params.id);
  }
}
