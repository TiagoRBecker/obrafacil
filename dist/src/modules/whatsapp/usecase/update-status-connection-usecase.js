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
var UpdateStatusConnectionUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusConnectionUseCase = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_session_entity_1 = require("../entity/whatsapp-session.entity");
const whatsapp_repo_interface_1 = require("../repo/whatsapp-repo-interface");
let UpdateStatusConnectionUseCase = UpdateStatusConnectionUseCase_1 = class UpdateStatusConnectionUseCase {
    constructor(whatsappRepo) {
        this.whatsappRepo = whatsappRepo;
        this.logger = new common_1.Logger(UpdateStatusConnectionUseCase_1.name);
    }
    async execute(payload, instanceName) {
        const session = await this.whatsappRepo.findBySession(instanceName);
        if (!session?.props.instance) {
            this.logger.error(`Session não encontrada para atualizaçao `);
            return null;
        }
        if ('qrcode' in payload) {
            this.logger.log(`Atualizando a sessao do qrcod session ${session.props.instance}`);
            await this.updateQrcode(payload, session.props.instance);
            return;
        }
        await this.updateStatus(payload, session.props.instance);
        return;
    }
    async updateQrcode(payload, instanceName) {
        const updateSession = whatsapp_session_entity_1.WhatsAppSession.create({
            instance: instanceName,
            status: 'connecting',
            qrCode: payload.qrcode.base64,
        });
        await this.whatsappRepo.update(updateSession);
        return;
    }
    async updateStatus(payload, instanceName) {
        console.log('Aqui e o payload do status', payload.state);
        if (payload.state) {
            const updateSession = whatsapp_session_entity_1.WhatsAppSession.create({
                instance: instanceName,
                status: payload.state,
            });
            await this.whatsappRepo.update(updateSession);
            return;
        }
    }
};
exports.UpdateStatusConnectionUseCase = UpdateStatusConnectionUseCase;
exports.UpdateStatusConnectionUseCase = UpdateStatusConnectionUseCase = UpdateStatusConnectionUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [whatsapp_repo_interface_1.WhatsAppRepositoryInterface])
], UpdateStatusConnectionUseCase);
//# sourceMappingURL=update-status-connection-usecase.js.map