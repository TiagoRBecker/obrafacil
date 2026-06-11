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
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Configurações')
@Controller('admin/settings')
@UseGuards(AdminTokenGuard)
export class FindByIdSettingsController {
  constructor(private readonly findSettingsByIdUseCase: FindSettingsByIdUseCase) {}

  @Roles(UserRole.ADMIN,UserRole.USER)
  @RequirePermissions('settings:read')
  @Get('/me')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Buscar configurações da empresa',
    description: 'Retorna as configurações da empresa do usuário logado. Requer permissão `settings:read`.',
  })
  @ApiResponse({ status: 200, description: 'Configurações encontradas com sucesso.' })
  @ApiResponse({ status: 404, description: 'Configurações não encontradas para este usuário.' })
  findById(): Promise<SettingsResponseDto> {
  
    
   
    return this.findSettingsByIdUseCase.execute();
  }
}
