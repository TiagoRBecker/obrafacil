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
var ConnectionUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionUseCase = void 0;
const common_1 = require("@nestjs/common");
const evo_api_client_1 = require("../../evo/infra/evo-api.client");
const whatsapp_session_entity_1 = require("../entity/whatsapp-session.entity");
const whatsapp_repo_interface_1 = require("../repo/whatsapp-repo-interface");
let ConnectionUseCase = ConnectionUseCase_1 = class ConnectionUseCase {
    constructor(evoService, whatsappRepo) {
        this.evoService = evoService;
        this.whatsappRepo = whatsappRepo;
        this.logger = new common_1.Logger(ConnectionUseCase_1.name);
    }
    async execute(instanceName) {
        const session = await this.whatsappRepo.findBySession(instanceName);
        if (session?.props.instance)
            throw new common_1.ConflictException(`Já existe uma instancia criada `);
        try {
            const createInstance = await this.evoService.create(instanceName);
            this.logger.log(`Criando instancia nova  ${createInstance.instance.instanceName}`);
            const data = await this.evoService.connect(instanceName);
            const createNewSession = whatsapp_session_entity_1.WhatsAppSession.create({
                instance: createInstance.instance.instanceName,
                status: 'connecting',
                qrCode: data.base64,
            });
            const newSession = await this.whatsappRepo.create(createNewSession);
            const { status, qrCode } = newSession.props;
            this.logger.log(`Conexao criada  ${createInstance.instance.instanceName}`);
            return { status, qrCode };
        }
        catch (error) {
            this.logger.error(`Erro ao conectar com WhatsApp: ${error.message || error}`);
            throw error;
        }
    }
};
exports.ConnectionUseCase = ConnectionUseCase;
exports.ConnectionUseCase = ConnectionUseCase = ConnectionUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [evo_api_client_1.EvoApiClient,
        whatsapp_repo_interface_1.WhatsAppRepositoryInterface])
], ConnectionUseCase);
//# sourceMappingURL=connection-instance.usecase.js.map