"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evoConfig = void 0;
const config_1 = require("@nestjs/config");
exports.evoConfig = (0, config_1.registerAs)('evo', () => ({
    apiKey: process.env.EVO_API_KEY,
    baseUrl: process.env.EVO_BASE_URL,
    instanceName: process.env.INSTANCE_NAME,
    webhook: process.env.WEBHOOK_URL,
    allowedIps: process.env.WEBHOOK_ALLOWED_IPS,
}));
//# sourceMappingURL=index.js.map