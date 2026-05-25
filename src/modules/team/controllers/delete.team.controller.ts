import {
  Controller,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { TeamMemberIdParamDto } from '../dto/team-member-id-param.dto';
import { DeleteTeamMemberResponseDto } from '../dto/delete-team-member-response.dto';
import { DeleteTeamMemberUseCase } from '../usecase/delete-team-member.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Equipe')
@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class DeleteTeamMemberController {
  constructor(private readonly deleteTeamMemberUseCase: DeleteTeamMemberUseCase) {}

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Excluir membro da equipe',
    description: 'Remove um membro da equipe do sistema pelo seu ID. Requer papel ADMIN.',
  })
  @ApiParam({ name: 'id', description: 'ID único do membro da equipe a ser excluído', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Membro da equipe excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Membro da equipe não encontrado.' })
  delete(
    @Param() params: TeamMemberIdParamDto,
  ): Promise<DeleteTeamMemberResponseDto> {
    return this.deleteTeamMemberUseCase.execute(params.id);
  }
}
