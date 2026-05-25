import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConnectionUseCase } from '../usecase/connection-instance.usecase';

@Controller('instance')
export class ConnectionWhatsAppController {
  constructor(
    private readonly connectionService: ConnectionUseCase,
  ) {}

  @Post('create/connection')
  connection(@Body() body: { instanceName: string }) {
  
    return this.connectionService.execute(body.instanceName);
  }
}
