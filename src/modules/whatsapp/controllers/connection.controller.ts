import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateConnectionUseCase } from '../usecase/create-connection-instance.usecase';

@ApiTags('WhatsApp')
@Controller('instance')
export class ConnectionWhatsAppController {
  constructor(
    private readonly connectionService: CreateConnectionUseCase,
  ) {}

  @Post('create/connection')
  @ApiOperation({
    summary: 'Criar conexão WhatsApp',
    description: 'Inicia uma nova conexão com o WhatsApp. Cria uma instância para gerar o QR Code de conexão.',
  })
  @ApiBody({ schema: { type: 'object', properties: { instanceName: { type: 'string', description: 'Nome da instância WhatsApp' } } } })
  @ApiResponse({ status: 201, description: 'Conexão iniciada. QR Code disponível para escaneamento.' })
  connection(@Body() body: { instanceName: string }) {
    return this.connectionService.execute(body.instanceName);
  }
}
