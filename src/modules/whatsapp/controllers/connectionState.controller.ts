import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { RequirePermissions } from '../../../../decorators';

@Controller('instance')
export class ConnectionStateController {
  @RequirePermissions('settings:read')
  @Get('connectionState/:instanceName')
  connectionState(@Param('instanceName') instanceName: string) {
    return { message: 'Status conexão', instanceName };
  }
}
