import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { FindAllBudgetsUseCase, PaginatedBudgetsResult } from '../usecase/find-all-budgets.usecase';
import { UserRole } from '../../../../decorators/types';
import { RequirePermissions, Roles } from '../../../../decorators';
import { PaginationParams } from '../../../common/dto/pagination.dto';

@ApiTags('Orçamentos')
@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class FindAllBudgetsController {
  constructor(private readonly findAllBudgetsUseCase: FindAllBudgetsUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('order:read')
  @Get('all')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Listar orçamentos (paginado)',
    description: 'Retorna orçamentos cadastrados com paginação. Requer permissão `order:read`. Disponível para ADMIN e USER.',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de orçamentos retornada com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  findAll(@Query() query: PaginationParams): Promise<PaginatedBudgetsResult> {
    return this.findAllBudgetsUseCase.execute(query.page, query.limit);
  }

}
