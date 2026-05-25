import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { TeamMemberIdParamDto } from '../dto/team-member-id-param.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { UpdateTeamMemberDto } from '../dto/update-team-member.dto';
import { UpdateTeamMemberUseCase } from '../usecase/update-team-member.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Equipe')
@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class UpdateTeamMemberController {
  constructor(private readonly updateTeamMemberUseCase: UpdateTeamMemberUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('team:update')
  @Patch('update/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Atualizar membro da equipe',
    description: 'Atualiza os dados de um membro da equipe existente. Requer permissão `team:update` e papel ADMIN.',
  })
  @ApiParam({ name: 'id', description: 'ID único do membro da equipe a ser atualizado', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpdateTeamMemberDto, description: 'Dados atualizados do membro da equipe' })
  @ApiResponse({ status: 200, description: 'Membro da equipe atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Membro da equipe não encontrado.' })
  update(
    @Param() params: TeamMemberIdParamDto,
    @Body() body: UpdateTeamMemberDto,
  ): Promise<TeamMemberResponseDto> {
    return this.updateTeamMemberUseCase.execute(params.id, body);
  }
}
