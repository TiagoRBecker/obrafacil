"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppController = void 0;
const connect_instance_controller_1 = require("./connect.instance.controller");
const connectionState_controller_1 = require("./connectionState.controller");
const connection_controller_1 = require("./connection.controller");
const create_instance_controller_1 = require("./create.instance.controller");
const message_controller_1 = require("./message.controller");
const webhook_controller_1 = require("./webhook.controller");
exports.WhatsAppController = [
    connection_controller_1.ConnectionWhatsAppController,
    create_instance_controller_1.CreateInstanceController,
    connect_instance_controller_1.ConnectInstanceController,
    connectionState_controller_1.ConnectionStateController,
    message_controller_1.SendMediaController,
    webhook_controller_1.WebhookController,
];
//# sourceMappingURL=index.js.map