import { ConnectionWhatsAppController } from './connection.controller';
import { GetConnectionWhatsAppController } from './find.connectio.controller';
import { SendMessageController } from './message.controller';
import { WebhookController } from './webhook.controller';
export declare const WhatsAppController: (typeof WebhookController | typeof ConnectionWhatsAppController | typeof GetConnectionWhatsAppController | typeof SendMessageController)[];
