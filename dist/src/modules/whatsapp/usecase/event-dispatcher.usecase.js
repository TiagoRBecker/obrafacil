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
var EventDispatcherService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcherService = void 0;
const common_1 = require("@nestjs/common");
const update_status_connection_usecase_1 = require("./update-status-connection-usecase");
const REQUIRES_QR_REASONS = new Set([401, 403]);
let EventDispatcherService = EventDispatcherService_1 = class EventDispatcherService {
    constructor(UpdateStatusConnectionUseCase) {
        this.UpdateStatusConnectionUseCase = UpdateStatusConnectionUseCase;
        this.logger = new common_1.Logger(EventDispatcherService_1.name);
    }
    async execute(payload) {
        switch (payload.event) {
            case 'connection.update':
                await this.UpdateStatusConnectionUseCase.execute(payload.data, payload.instance);
                break;
            case 'qrcode.updated':
                await this.UpdateStatusConnectionUseCase.execute(payload.data, payload.instance);
                break;
            case 'messages.upsert':
                break;
            case 'messages.update':
                break;
            default:
                this.logger.debug(`[${payload.instance}] Evento não tratado: ${payload.event}`);
        }
    }
};
exports.EventDispatcherService = EventDispatcherService;
exports.EventDispatcherService = EventDispatcherService = EventDispatcherService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [update_status_connection_usecase_1.UpdateStatusConnectionUseCase])
], EventDispatcherService);
//# sourceMappingURL=event-dispatcher.usecase.js.map