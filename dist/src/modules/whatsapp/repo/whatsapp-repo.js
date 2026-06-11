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
exports.WhatsAppRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../db/prisma");
const whatsapp_repo_interface_1 = require("./whatsapp-repo-interface");
const whatsapp_session_entity_1 = require("../entity/whatsapp-session.entity");
let WhatsAppRepo = class WhatsAppRepo extends whatsapp_repo_interface_1.WhatsAppRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async create(session) {
        const { instance, status, qrCode } = session.props;
        const created = await this.prisma.whatsAppSession.create({
            data: { instance, status, qrCode },
        });
        return whatsapp_session_entity_1.WhatsAppSession.create({
            instance: created.instance,
            status: created.status,
            id: created.id,
            qrCode: created.qrCode,
        });
    }
    async findBySession(name) {
        const session = await this.prisma.whatsAppSession.findUnique({
            where: { instance: name },
        });
        if (!session)
            return null;
        return whatsapp_session_entity_1.WhatsAppSession.create({
            instance: session.instance,
            status: session.status,
            id: session.id,
            qrCode: session.qrCode,
        });
    }
    async update(session) {
        const { instance, status, qrCode } = session.props;
        const updated = await this.prisma.whatsAppSession.update({
            where: { instance },
            data: { instance, status, qrCode },
        });
        return whatsapp_session_entity_1.WhatsAppSession.create({
            instance: updated.instance,
            status: updated.status,
            id: updated.id,
            qrCode: updated.qrCode,
        });
    }
    async findByFirstSession() {
        const session = await this.prisma.whatsAppSession.findFirst({});
        if (!session)
            return null;
        return whatsapp_session_entity_1.WhatsAppSession.create({
            instance: session.instance,
            status: session.status,
            id: session.id,
            qrCode: session.qrCode,
        });
    }
};
exports.WhatsAppRepo = WhatsAppRepo;
exports.WhatsAppRepo = WhatsAppRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], WhatsAppRepo);
//# sourceMappingURL=whatsapp-repo.js.map