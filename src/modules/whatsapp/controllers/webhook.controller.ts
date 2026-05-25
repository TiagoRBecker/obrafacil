import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { EventDispatcherService } from '../usecase/event-dispatcher.usecase';
import { WebhookGuard } from '../../../guards/webhook.guard';

@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly eventWebhook: EventDispatcherService) {}

  @Post('/message/connection-update')
  @UseGuards(WebhookGuard)
  @ApiSecurity('webhook-secret')
  @ApiOperation({
    summary: 'Receber atualizações de conexão WhatsApp',
    description: 'Webhook para receber eventos de atualização de status da conexão WhatsApp (QR code lido, conexão estabelecida, desconectado, etc.). Requer header `x-webhook-secret` para autenticação.',
  })
  @ApiBody({ description: 'Dados do evento enviado pela Evolution API', schema: { type: 'object' } })
  @ApiResponse({ status: 201, description: 'Evento processado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Webhook secret inválido.' })
  sendMedia(@Body() body) {
    return this.eventWebhook.execute(body);
  }
}
