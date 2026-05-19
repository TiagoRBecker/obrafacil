import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { RequirePermissions } from '../../../../decorators';
import { Connection } from 'puppeteer';
import { ConnectionUSeCase } from '../usecase/connection.service';
import { WebHookUseCase } from '../usecase/update.status.webhook.service';

@Controller('instance')
@UseGuards(AdminTokenGuard)
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionUSeCase) {}
  @RequirePermissions('settings:create')
  @Get('connection')
  create(@Req() req: any, @Body() body: { instanceName: string }) {
    const userId = req.user;
    return this.connectionService.execute();
  }

  @RequirePermissions('settings:read')
  @Get('connect/:instanceName')
  connect(@Param('instanceName') instanceName: string) {
    return { message: 'Gerar QR Code', instanceName };
  }

  @RequirePermissions('settings:read')
  @Get('connectionState/:instanceName')
  connectionState(@Param('instanceName') instanceName: string) {
    return { message: 'Status conexão', instanceName };
  }
}

@Controller('message')
@UseGuards(AdminTokenGuard)
export class MessageController {
  @RequirePermissions('settings:create')
  @Post('sendMedia/:instanceName')
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
@Controller('webhook')
export class Webhook {
  constructor(private readonly updateEvents: WebHookUseCase) {}
  @Post('/message/connection-update')
  sendMedia(
    @Body()
    body: {
      event: string;
      data: {
        keyId: string;
        status: string;
      };
    },
  ) {
    
    return this.updateEvents.execute(body);
  }
}
