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
var ConnectionUSeCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionUSeCase = void 0;
const common_1 = require("@nestjs/common");
const evo_api_client_1 = require("../../evo/infra/evo-api.client");
let ConnectionUSeCase = ConnectionUSeCase_1 = class ConnectionUSeCase {
    constructor(evoService) {
        this.evoService = evoService;
        this.logger = new common_1.Logger(ConnectionUSeCase_1.name);
    }
    async execute() {
        try {
            this.logger.log('Iniciando conexão com WhatsApp');
            const data = await this.evoService.connect();
            this.logger.log('Conexão com WhatsApp estabelecida com sucesso');
            return data;
        }
        catch (error) {
            this.logger.error(`Erro ao conectar com WhatsApp: ${error.message || error}`);
            throw error;
        }
    }
};
exports.ConnectionUSeCase = ConnectionUSeCase;
exports.ConnectionUSeCase = ConnectionUSeCase = ConnectionUSeCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [evo_api_client_1.EvoApiClient])
], ConnectionUSeCase);
//# sourceMappingURL=connection.service.js.map