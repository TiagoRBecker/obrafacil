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
var SettingsRepo_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../db/prisma");
const settings_entity_1 = require("../entity/settings.entity");
const settings_repository_1 = require("./settings.repository");
let SettingsRepo = SettingsRepo_1 = class SettingsRepo extends settings_repository_1.SettingsRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
        this.logger = new common_1.Logger(SettingsRepo_1.name);
    }
    async findById(email) {
        try {
            const data = await this.prisma.settings.findUnique({
                where: {
                    email: email
                },
            });
            return settings_entity_1.SettingsEntity.create({
                email: data?.email,
                id: data?.id,
                name: data?.businessName,
                phone: data?.phone,
                specialty: data?.specialty,
                address: data?.address,
                logoUrl: data?.logoUrl,
            });
        }
        catch (error) {
            this.logger.error('Erro ao criar ', {
                error,
                operation: 'CREATE',
                entity: 'SettingsEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível criar  o cliente. Tente novamente.`);
        }
    }
    async create(settings) {
        const { address, email, logoUrl, name, phone, specialty } = settings;
        try {
            const data = await this.prisma.settings.create({
                data: {
                    email,
                    businessName: name,
                    phone,
                    specialty,
                    address,
                    logoUrl,
                    defaultBillingUnit: '',
                    proposalValidityDays: 7,
                    proposalTerms: '',
                    warrantyTerms: '',
                },
            });
            return settings_entity_1.SettingsEntity.create({
                email: data.email,
                id: data.id,
                name: data.businessName,
                phone: data.phone,
                specialty: data.specialty,
                address: data.address,
                logoUrl: data.logoUrl,
            });
        }
        catch (error) {
            this.logger.error('Erro ao criar ', {
                error,
                operation: 'CREATE',
                entity: 'SettingsEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível criar  o cliente. Tente novamente.`);
        }
    }
    async update(settings) {
        throw '';
    }
};
exports.SettingsRepo = SettingsRepo;
exports.SettingsRepo = SettingsRepo = SettingsRepo_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], SettingsRepo);
//# sourceMappingURL=settings-repo.js.map