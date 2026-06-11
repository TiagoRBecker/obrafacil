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
import { RequirePermissions, Roles } from '../../../../decorators';
import { CreatetSettingsUseCase } from '../usecase/create-settings-usecase';
import { CreateSettingsDto } from '../dto/create-settings-dto';
import { UserRole } from '../../../../decorators/types';


@ApiTags('Configurações')
@Controller('admin/settings/create')
@UseGuards(AdminTokenGuard)
export class CreateSettingsController {
  constructor(private readonly createSettingsUseCase: CreatetSettingsUseCase) {}
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
  create(
    @Req() req,
    @Body() body: CreateSettingsDto,
  ): Promise<SettingsResponseDto> {
    
    return this.createSettingsUseCase.execute(body, req.user);
  }
}
