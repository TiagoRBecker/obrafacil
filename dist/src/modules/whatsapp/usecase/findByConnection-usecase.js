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
var GetConnectionUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConnectionUseCase = void 0;
const common_1 = require("@nestjs/common");
const evo_api_client_1 = require("../../evo/infra/evo-api.client");
const whatsapp_session_entity_1 = require("../entity/whatsapp-session.entity");
const whatsapp_repo_interface_1 = require("../repo/whatsapp-repo-interface");
let GetConnectionUseCase = GetConnectionUseCase_1 = class GetConnectionUseCase {
    constructor(evoService, whatsappRepo) {
        this.evoService = evoService;
        this.whatsappRepo = whatsappRepo;
        this.logger = new common_1.Logger(GetConnectionUseCase_1.name);
    }
    async execute(instanceName) {
        const session = await this.whatsappRepo.findBySession(instanceName);
        if (!session?.props.instance)
            throw new common_1.NotFoundException(`Nenhuma instancia   criada  `);
        try {
            if (session.props.status === 'closed' ||
                session.props.status === 'refused') {
                this.logger.log('Conexao status closed  /refused   necessario criar  uma nova');
                const data = await this.evoService.connect(session?.props.instance);
                const createNewSession = whatsapp_session_entity_1.WhatsAppSession.create({
                    instance: session.props.instance,
                    status: 'connecting',
                    qrCode: data.base64,
                });
                const updateNewSession = await this.whatsappRepo.update(createNewSession);
                const { qrCode, status } = updateNewSession.props;
                return { qrCode, status };
            }
            const { qrCode, status } = session.props;
            this.logger.log('Conexao ainda valida  nao necessario criar  uma nova');
            return { qrCode, status };
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar a instancia  com WhatsApp: ${error.message || error}`);
            throw error;
        }
    }
};
exports.GetConnectionUseCase = GetConnectionUseCase;
exports.GetConnectionUseCase = GetConnectionUseCase = GetConnectionUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [evo_api_client_1.EvoApiClient,
        whatsapp_repo_interface_1.WhatsAppRepositoryInterface])
], GetConnectionUseCase);
//# sourceMappingURL=findByConnection-usecase.js.map