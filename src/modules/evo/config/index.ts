import { registerAs } from '@nestjs/config';

export const evoConfig = registerAs('evo', () => ({
  apiKey: process.env.EVO_API_KEY,
  baseUrl: process.env.EVO_BASE_URL,
  instanceName: process.env.INSTANCE_NAME,
  webhook: process.env.WEBHOOK_URL,
  allowedIps: process.env.WEBHOOK_ALLOWED_IPS,
}));