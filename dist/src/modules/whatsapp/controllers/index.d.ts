import { ConnectionWhatsAppController } from './connection.controller';
import { GetConnectionWhatsAppController } from './find.connectio.controller';
import { SendMediaController } from './message.controller';
import { WebhookController } from './webhook.controller';
export declare const WhatsAppController: (typeof ConnectionWhatsAppController | typeof GetConnectionWhatsAppController | typeof SendMediaController | typeof WebhookController)[];
