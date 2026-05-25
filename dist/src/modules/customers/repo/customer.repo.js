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
exports.CustomerRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../db/prisma");
const customer_entity_1 = require("../entity/customer.entity");
const customer_repository_interface_1 = require("./customer-repository.interface");
let CustomerRepo = class CustomerRepo extends customer_repository_interface_1.CustomerRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async create(customer) {
        const data = await this.prisma.customer.create({
            data: {
                name: customer.name,
                phone: customer.phone,
                address: customer.address,
                service: customer.service,
                city: customer.city,
            },
        });
        return customer_entity_1.CustomerEntity.create({
            address: data.address ?? '',
            name: data.name,
            phone: data.phone,
            service: data.service ?? '',
            city: data.city ?? '',
        });
    }
    async findAll() {
        const customers = await this.prisma.customer.findMany({
            include: { orders: true },
        });
        return customers.map((c) => ({
            customer: customer_entity_1.CustomerEntity.toDTO({
                id: c.id,
                name: c.name ?? '',
                phone: c.phone ?? '',
                address: c.address ?? '',
                service: c.service ?? '',
                city: c.city ?? '',
            }),
            orders: c.orders ?? [],
        }));
    }
    async findById(id) {
        const customer = await this.prisma.customer.findUnique({ where: { id } });
        if (!customer)
            return null;
        return customer_entity_1.CustomerEntity.toDTO({
            id: customer.id,
            address: customer.address ?? '',
            name: customer.name ?? '',
            phone: customer.phone ?? '',
            service: customer.service ?? '',
            city: customer.city ?? '',
        });
    }
    async findByPhone(phone) {
        const customer = await this.prisma.customer.findUnique({ where: { phone } });
        if (!customer)
            return null;
        return customer_entity_1.CustomerEntity.toDTO({
            id: customer.id,
            address: customer.address ?? '',
            name: customer.name ?? '',
            phone: customer.phone ?? '',
            service: customer.service ?? '',
            city: customer.city ?? '',
        });
    }
    async update(id, customer) {
        const updated = await this.prisma.customer.update({
            where: { id },
            data: {
                address: customer.address,
                name: customer.name,
                phone: customer.phone,
                service: customer.service,
                city: customer.city,
            },
        });
        return customer_entity_1.CustomerEntity.toDTO({
            id: updated.id,
            address: updated.address ?? '',
            name: updated.name,
            phone: updated.phone,
            service: updated.service ?? '',
            city: updated.city ?? '',
        });
    }
    async delete(id) {
        await this.prisma.customer.delete({ where: { id } });
    }
};
exports.CustomerRepo = CustomerRepo;
exports.CustomerRepo = CustomerRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], CustomerRepo);
//# sourceMappingURL=customer.repo.js.map