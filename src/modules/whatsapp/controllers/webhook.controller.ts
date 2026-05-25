import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EventDispatcherService } from '../usecase/event-dispatcher.usecase';
import { WebhookGuard } from '../guards/webhook.guard';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly eventWebhook: EventDispatcherService) {}

  @Post('/message/connection-update')
  @UseGuards(WebhookGuard)
  sendMedia(@Body() body) {
    return this.eventWebhook.execute(body);
  }
}
