import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { RequirePermissions } from '../../../../decorators';

@Controller('instance')
export class ConnectInstanceController {
  @RequirePermissions('settings:read')
  @Get('connect/:instanceName')
  connect(@Param('instanceName') instanceName: string) {
    return { message: 'Gerar QR Code', instanceName };
  }
}
