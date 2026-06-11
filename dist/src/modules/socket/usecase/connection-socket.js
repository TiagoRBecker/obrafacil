"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SocketConnectionHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketConnectionHandler = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let SocketConnectionHandler = SocketConnectionHandler_1 = class SocketConnectionHandler {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(SocketConnectionHandler_1.name);
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token;
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            client.data.user = payload;
            this.logger.log(`Conectado: ${client.id} | user: ${payload.sub}`);
        }
        catch {
            this.logger.warn(`Conexão recusada: ${client.id}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Desconectado: ${client.id}`);
    }
};
exports.SocketConnectionHandler = SocketConnectionHandler;
exports.SocketConnectionHandler = SocketConnectionHandler = SocketConnectionHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], SocketConnectionHandler);
//# sourceMappingURL=connection-socket.js.map