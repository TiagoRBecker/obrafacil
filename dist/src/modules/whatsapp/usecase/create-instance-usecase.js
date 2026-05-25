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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInstanceNameUseCase = void 0;
const common_1 = require("@nestjs/common");
const evo_api_client_1 = require("../../evo/infra/evo-api.client");
let CreateInstanceNameUseCase = class CreateInstanceNameUseCase {
    constructor(evoService) {
        this.evoService = evoService;
    }
    async execute(instanceName) {
        const existInstances = await this.evoService.getInstance();
        const exists = existInstances.some((instance) => instance.name === instanceName);
        if (exists) {
            throw new common_1.ConflictException(`Ja existe uma instancia   cadastrada!`);
        }
        const createInstance = await this.evoService.create(instanceName);
        console.log(createInstance);
        return `Instancia criada com sucesso`;
    }
};
exports.CreateInstanceNameUseCase = CreateInstanceNameUseCase;
exports.CreateInstanceNameUseCase = CreateInstanceNameUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [evo_api_client_1.EvoApiClient])
], CreateInstanceNameUseCase);
//# sourceMappingURL=create-instance-usecase.js.map