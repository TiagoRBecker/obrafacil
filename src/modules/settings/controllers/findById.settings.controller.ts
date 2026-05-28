import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { SettingsResponseDto } from '../dto/settings-response.dto';
import { FindSettingsByIdUseCase } from '../usecase/find-settings-by-id.usecase';
import { RequirePermissions } from '../../../../decorators';

@ApiTags('Configurações')
@Controller('admin/settings')
@UseGuards(AdminTokenGuard)
export class FindByIdSettingsController {
  constructor(private readonly findSettingsByIdUseCase: FindSettingsByIdUseCase) {}

  @RequirePermissions('settings:read')
  @Get('/me')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Buscar configurações da empresa',
    description: 'Retorna as configurações da empresa do usuário logado. Requer permissão `settings:read`.',
  })
  @ApiResponse({ status: 200, description: 'Configurações encontradas com sucesso.' })
  @ApiResponse({ status: 404, description: 'Configurações não encontradas para este usuário.' })
  findById(@Req() req): Promise<SettingsResponseDto> {
  
    const userId = req.user;
   
    return this.findSettingsByIdUseCase.execute(userId);
  }
}
