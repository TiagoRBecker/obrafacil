import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CreateTeamMemberDto } from '../dto/create-team-member.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { CreateTeamMemberUseCase } from '../usecase/create-team-member.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Equipe')
@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class CreateTeamMemberController {
  constructor(private readonly createTeamMemberUseCase: CreateTeamMemberUseCase) {}

  @Post('create')
  @Roles(UserRole.ADMIN)
  @RequirePermissions('team:create')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Criar membro da equipe',
    description: 'Adiciona um novo membro à equipe. Requer permissão `team:create` e papel ADMIN.',
  })
  @ApiBody({ type: CreateTeamMemberDto, description: 'Dados do membro da equipe' })
  @ApiResponse({ status: 201, description: 'Membro da equipe criado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  create(@Body() body: CreateTeamMemberDto): Promise<TeamMemberResponseDto> {
    return this.createTeamMemberUseCase.execute(body);
  }
}
