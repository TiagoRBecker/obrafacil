import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetConnectionUseCase } from '../usecase/findByConnection-usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';

@ApiTags('WhatsApp')
@UseGuards(AdminTokenGuard)
@Controller('instance')
export class GetConnectionWhatsAppController {
  constructor(
    private readonly connectionService: GetConnectionUseCase,
  ) {}

  @Get('/connection/:id/qrcode')
    @Roles(UserRole.ADMIN)
      @RequirePermissions('settings:read')
  @ApiOperation({
    summary: 'Obter QR Code da conexão',
    description: 'Retorna o QR Code para conexão com o WhatsApp de uma instância específica.',
  })
  @ApiParam({ name: 'id', description: 'ID da instância/conexão WhatsApp', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'QR Code retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Conexão não encontrada.' })
  connection(@Param() params) {
    return this.connectionService.execute(params.id);
  }
}
