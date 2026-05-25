import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { SettingsIdParamDto } from '../dto/settings-id-param.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpdateSettingsUseCase } from '../usecase/update-settings.usecase';

@ApiTags('Configurações')
@Controller('admin/settings')
@UseGuards(AdminTokenGuard)
export class UpdateSettingsController {
  constructor(private readonly updateSettingsUseCase: UpdateSettingsUseCase) {}

  @Patch('update/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Atualizar configurações da empresa',
    description: 'Atualiza as configurações da empresa pelo ID da configuração.',
  })
  @ApiParam({ name: 'id', description: 'ID único da configuração', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpsertSettingsDto, description: 'Dados atualizados da configuração' })
  @ApiResponse({ status: 200, description: 'Configurações atualizadas com sucesso.' })
  @ApiResponse({ status: 404, description: 'Configuração não encontrada.' })
  update(
    @Param() params: SettingsIdParamDto,
    @Body() body: UpsertSettingsDto,
  ): Promise<SettingsResponseDto> {
    return this.updateSettingsUseCase.execute(params.id, body);
  }
}
