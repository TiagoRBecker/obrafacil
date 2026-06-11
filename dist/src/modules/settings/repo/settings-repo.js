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
exports.SettingsRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../db/prisma");
const settings_entity_1 = require("../entity/settings.entity");
const settings_repository_1 = require("./settings.repository");
let SettingsRepo = class SettingsRepo extends settings_repository_1.SettingsRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async findByfirst() {
        const data = await this.prisma.settings.findFirst({});
        if (!data)
            return null;
        return settings_entity_1.SettingsEntity.create({
            email: data.email,
            id: data.id,
            name: data.businessName ?? '',
            phone: data.phone,
            specialty: data.specialty,
            address: data.address ?? '',
            logoUrl: data.logoUrl ?? '',
        });
    }
    async findByEmail(email) {
        const data = await this.prisma.settings.findUnique({
            where: { email },
        });
        if (!data)
            return null;
        return settings_entity_1.SettingsEntity.create({
            email: data.email,
            id: data.id,
            name: data.businessName ?? '',
            phone: data.phone,
            specialty: data.specialty,
            address: data.address ?? '',
            logoUrl: data.logoUrl ?? '',
        });
    }
    async create(settings) {
        const data = await this.prisma.settings.create({
            data: {
                email: settings.email,
                businessName: settings.name,
                phone: settings.phone,
                specialty: settings.specialty,
                address: settings.address,
                logoUrl: settings.logoUrl,
                defaultBillingUnit: '',
                proposalValidityDays: 7,
                proposalTerms: '',
                warrantyTerms: '',
            },
        });
        return settings_entity_1.SettingsEntity.create({
            email: data.email,
            id: data.id,
            name: data.businessName ?? '',
            phone: data.phone,
            specialty: data.specialty,
            address: data.address ?? '',
            logoUrl: data.logoUrl ?? '',
        });
    }
    async update(settings) {
        const data = await this.prisma.settings.update({
            where: { id: settings.id },
            data: {
                businessName: settings.name,
                phone: settings.phone,
                specialty: settings.specialty,
                address: settings.address,
                logoUrl: settings.logoUrl,
            },
        });
        return settings_entity_1.SettingsEntity.create({
            email: data.email,
            id: data.id,
            name: data.businessName ?? '',
            phone: data.phone,
            specialty: data.specialty,
            address: data.address ?? '',
            logoUrl: data.logoUrl ?? '',
        });
    }
};
exports.SettingsRepo = SettingsRepo;
exports.SettingsRepo = SettingsRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], SettingsRepo);
//# sourceMappingURL=settings-repo.js.map