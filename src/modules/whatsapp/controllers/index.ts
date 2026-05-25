import { ConnectInstanceController } from './connect.instance.controller';
import { ConnectionStateController } from './connectionState.controller';
import { ConnectionWhatsAppController } from './connection.controller';
import { CreateInstanceController } from './create.instance.controller';
import { SendMediaController } from './message.controller';
import { WebhookController } from './webhook.controller';

export const WhatsAppController = [
  ConnectionWhatsAppController,
  CreateInstanceController,
  ConnectInstanceController,
  ConnectionStateController,
  SendMediaController,
  WebhookController,
];
