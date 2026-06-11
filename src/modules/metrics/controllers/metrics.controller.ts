import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { GetMetricsUseCase } from '../usecase/get-metrics.usecase';
import { MetricsResponseDto } from '../dto/metrics-response.dto';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Métricas')
@UseGuards(AdminTokenGuard)
@Controller('admin/metrics')
export class MetricsController {
  constructor(private readonly getMetricsUseCase: GetMetricsUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('order:read')
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Obter métricas do dashboard',
    description:
      'Retorna contagens agregadas de clientes, orçamentos e membros da equipe. Requer permissão `order:read`.',
  })
  @ApiResponse({
    status: 200,
    description: 'Métricas retornadas com sucesso.',
    type: MetricsResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  async execute(): Promise<MetricsResponseDto> {
    return this.getMetricsUseCase.execute();
  }
}
