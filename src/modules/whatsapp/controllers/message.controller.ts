import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { RequirePermissions } from '../../../../decorators';

@ApiTags('WhatsApp')
@Controller('message')
@UseGuards(AdminTokenGuard)
export class SendMediaController {
  @RequirePermissions('settings:create')
  @Post('sendMedia/:instanceName')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Enviar mídia via WhatsApp',
    description: 'Envia uma mídia (imagem/documento) via WhatsApp para uma instância específica. Requer permissão `settings:create`.',
  })
  @ApiParam({ name: 'instanceName', description: 'Nome da instância WhatsApp', example: 'minha-conexao' })
  @ApiBody({ schema: { type: 'object', properties: { mediaUrl: { type: 'string', description: 'URL pública da mídia a ser enviada' }, caption: { type: 'string', description: 'Legenda da mídia (opcional)' } } } })
  @ApiResponse({ status: 201, description: 'Mídia enviada com sucesso.' })
  sendMedia(
    @Param('instanceName') instanceName: string,
    @Body() body: { mediaUrl: string; caption?: string },
  ) {
    return {
      message: 'Enviar orçamento',
      instanceName,
      mediaUrl: body.mediaUrl,
      caption: body.caption,
    };
  }
}
