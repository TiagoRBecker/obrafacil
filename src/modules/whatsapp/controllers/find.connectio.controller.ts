import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../../../common/dto/id-param.dto';
import { GetConnectionUseCase } from '../usecase/findByConnection-usecase';

@ApiTags('WhatsApp')
@Controller('instance')
export class GetConnectionWhatsAppController {
  constructor(
    private readonly connectionService: GetConnectionUseCase,
  ) {}

  @Get('/connection/:id/qrcode')
  @ApiOperation({
    summary: 'Obter QR Code da conexão',
    description: 'Retorna o QR Code para conexão com o WhatsApp de uma instância específica.',
  })
  @ApiParam({ name: 'id', description: 'ID da instância/conexão WhatsApp', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'QR Code retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Conexão não encontrada.' })
  connection(@Param() params: IdParamDto) {
    return this.connectionService.execute(params.id);
  }
}
