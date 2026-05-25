import {
  Controller,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { TeamMemberIdParamDto } from '../dto/team-member-id-param.dto';
import { DeleteTeamMemberResponseDto } from '../dto/delete-team-member-response.dto';
import { DeleteTeamMemberUseCase } from '../usecase/delete-team-member.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class DeleteTeamMemberController {
  constructor(private readonly deleteTeamMemberUseCase: DeleteTeamMemberUseCase) {}

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  delete(
    @Param() params: TeamMemberIdParamDto,
  ): Promise<DeleteTeamMemberResponseDto> {
    return this.deleteTeamMemberUseCase.execute(params.id);
  }
}
