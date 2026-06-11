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
import { UpsertSettingsUseCase } from '../usecase/upsert-settings.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';


@ApiTags('Configurações')
@Controller('admin/settings')
@UseGuards(AdminTokenGuard)
export class UpsertSettingsController {
  constructor(private readonly upsertSettingsUseCase: UpsertSettingsUseCase) {}
@Roles(UserRole.ADMIN)
  @RequirePermissions('settings:update')
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Criar ou atualizar configurações da empresa',
    description: 'Se o usuário já possui configurações, atualiza. Caso contrário, cria e vincula ao usuário logado.',
  })
  @ApiBody({ type: UpsertSettingsDto })
  @ApiResponse({ status: 201, description: 'Configurações salvas com sucesso.' })
  upsert(
    @Req() req,
    @Body() body: UpsertSettingsDto,
  ): Promise<SettingsResponseDto> {
    
    return this.upsertSettingsUseCase.execute(body, req.user);
  }
}
