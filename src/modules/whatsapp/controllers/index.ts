
import { ConnectionWhatsAppController } from './connection.controller';
import { GetConnectionWhatsAppController } from './find.connectio.controller';
import { SendMessageController } from './message.controller';
import { WebhookController } from './webhook.controller';

export const WhatsAppController = [
   ConnectionWhatsAppController,
   GetConnectionWhatsAppController,
  SendMessageController,
  WebhookController,
];
