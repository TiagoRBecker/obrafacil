import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsResponseDto } from '../dto/settings-response.dto';
import { CreateSettingsUseCase } from '../usecase/create-settings.usecase';
import { RequirePermissions } from '../../../../decorators';

@ApiTags('Configurações')
@Controller('admin/settings')
@UseGuards(AdminTokenGuard)
export class CreateSettingsController {
  constructor(private readonly createSettingsUseCase: CreateSettingsUseCase) {}

  @RequirePermissions('order:create')
  @Post('create')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Criar configurações da empresa',
    description: 'Cria as configurações iniciais da empresa (nome, especialidade, telefone, email, logo). Requer permissão `order:create`.',
  })
  @ApiBody({ type: UpsertSettingsDto, description: 'Dados de configuração da empresa' })
  @ApiResponse({ status: 201, description: 'Configurações criadas com sucesso.' })
  create(
    @Req() req,
    @Body() body: UpsertSettingsDto,
  ): Promise<SettingsResponseDto> {
    const userId = req.user;
    return this.createSettingsUseCase.execute(body, userId);
  }
}
