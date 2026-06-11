import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { RequirePermissions } from '../../../../decorators';
import { SendMessageUseCase } from '../usecase/send-message.usecase';

@ApiTags('Mensagens')
@Controller('WhatsApp')
@UseGuards(AdminTokenGuard)
export class SendMessageController {
  constructor(private readonly sendMessage: SendMessageUseCase) {}
  @RequirePermissions('order:create')
  @Post('send/message')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Enviar orçamento via WhatsApp',
    description: 'Envia um orçamento como mensagem via WhatsApp. Requer permissão `order:create`.',
  })
  @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string', description: 'ID do orçamento a ser enviado' } } } })
  @ApiResponse({ status: 201, description: 'Mensagem enviada com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  create(@Body() body: { id: string }, @Req() request: Request) {
    return this.sendMessage.execute(body.id, request.user as string);
  }
}
