import { registerAs } from '@nestjs/config';

export const evoConfig = registerAs('evo', () => ({
  apiKey: process.env.EVO_API_KEY,
  baseUrl: process.env.EVO_BASE_URL,
  istanceName:process.env.INSTANCE_NAME
}));