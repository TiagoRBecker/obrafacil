import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { RequirePermissions } from '../../../../decorators';

@Controller('message')
@UseGuards(AdminTokenGuard)
export class SendMediaController {
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
