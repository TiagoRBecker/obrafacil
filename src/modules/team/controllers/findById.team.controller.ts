import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { IdParamDto } from '../../../common/dto/id-param.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { FindTeamMemberByIdUseCase } from '../usecase/find-team-member-by-id.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Equipe')
@UseGuards(AdminTokenGuard)
@Controller('admin/team')
export class FindByIdTeamMemberController {
  constructor(private readonly findTeamMemberByIdUseCase: FindTeamMemberByIdUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('team:read')
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Buscar membro da equipe por ID',
    description: 'Retorna os dados de um membro da equipe específico. Requer permissão `team:read`. Disponível para ADMIN e USER.',
  })
  @ApiParam({ name: 'id', description: 'ID único do membro da equipe', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Membro da equipe encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Membro da equipe não encontrado.' })
  findById(
    @Param() params: IdParamDto,
  ): Promise<TeamMemberResponseDto> {
    return this.findTeamMemberByIdUseCase.execute(params.id);
  }
}
