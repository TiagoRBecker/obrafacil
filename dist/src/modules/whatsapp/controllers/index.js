"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppController = void 0;
const connection_controller_1 = require("./connection.controller");
const find_connectio_controller_1 = require("./find.connectio.controller");
const message_controller_1 = require("./message.controller");
const webhook_controller_1 = require("./webhook.controller");
exports.WhatsAppController = [
    connection_controller_1.ConnectionWhatsAppController,
    find_connectio_controller_1.GetConnectionWhatsAppController,
    message_controller_1.SendMediaController,
    webhook_controller_1.WebhookController,
];
//# sourceMappingURL=index.js.map