import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { FindAllTeamMembersUseCase } from '../usecase/find-all-team-members.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Equipe')
@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class FindAllTeamMembersController {
  constructor(private readonly findAllTeamMembersUseCase: FindAllTeamMembersUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('team:read')
  @Get('all')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Listar membros da equipe',
    description: 'Retorna todos os membros da equipe cadastrados. Requer permissão `team:read`. Disponível para ADMIN e USER.',
  })
  @ApiResponse({ status: 200, description: 'Lista de membros da equipe retornada com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  findAll(): Promise<TeamMemberResponseDto[]> {
    return this.findAllTeamMembersUseCase.execute();
  }
}
