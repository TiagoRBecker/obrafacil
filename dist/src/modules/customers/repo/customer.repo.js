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
var CustomerRepo_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../db/prisma");
const customer_entity_1 = require("../entity/customer.entity");
const customer_repo_inteface_1 = require("./customer.repo.inteface");
let CustomerRepo = CustomerRepo_1 = class CustomerRepo extends customer_repo_inteface_1.CustomerRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
        this.logger = new common_1.Logger(CustomerRepo_1.name);
    }
    async create(customer) {
        const { address, id, name, phone, service, city } = customer;
        try {
            const data = await this.prisma.customer.create({
                data: {
                    name,
                    phone,
                    address,
                    service,
                    city
                },
            });
            this.logger.log('Cliente criado com sucesso ');
            return customer_entity_1.CustomerEntity.create({
                address: data.address,
                name: data.name,
                phone: data.phone,
                service: data.service,
                city: data.city,
            });
        }
        catch (error) {
            this.logger.error('Erro ao criar o cliente', {
                error,
                operation: 'CREATE',
                entity: 'CustomerEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível criar  o cliente. Tente novamente.`);
        }
    }
    async findAll() {
        try {
            const customer = await this.prisma.customer.findMany({
                include: {
                    orders: true
                }
            });
            return customer.map((c) => {
                return {
                    customer: customer_entity_1.CustomerEntity.toDTO({
                        id: c.id,
                        name: c.name ?? '',
                        phone: c.phone ?? '',
                        address: c.address ?? '',
                        service: c.service ?? '',
                        city: c.city ?? '',
                    }),
                    orders: c.orders ?? []
                };
            });
        }
        catch (error) {
            this.logger.error('Erro ao bucar os clientes', {
                error,
                operation: 'FIND ALL',
                entity: 'CustomerEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível buscar os clientes. Tente novamente.`);
        }
    }
    async findById(id) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: {
                    id: id,
                },
            });
            return customer_entity_1.CustomerEntity.toDTO({
                id: customer?.id,
                address: customer?.address ?? '',
                name: customer?.name ?? '',
                phone: customer?.phone ?? '',
                service: customer?.service ?? '',
                city: customer?.city ?? '',
            });
        }
        catch (error) {
            this.logger.error('Erro ao bucar o cliente por ID', {
                error,
                operation: 'FIND BY ID',
                entity: 'CustomerEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível buscar o cliente. Tente novamente.`);
        }
    }
    async findByphone(phone) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: {
                    phone,
                },
            });
            return customer_entity_1.CustomerEntity.toDTO({
                id: customer?.id,
                address: customer?.address ?? '',
                name: customer?.name ?? '',
                phone: customer?.phone ?? '',
                service: customer?.service ?? '',
                city: customer?.city ?? '',
            });
        }
        catch (error) {
            this.logger.error('Erro ao bucar o cliente', {
                error,
                operation: 'FIND BY PHONE',
                entity: 'CustomerEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível buscar o cliente. Tente novamente.`);
        }
    }
    async update(id, customer) {
        const { address, name, phone, service, city } = customer;
        try {
            const update = await this.prisma.customer.update({
                where: {
                    id,
                },
                data: {
                    address,
                    name,
                    phone,
                    service,
                    city,
                },
            });
            return customer_entity_1.CustomerEntity.toDTO({
                address: update.address,
                city: update.city,
                name: update.name,
                phone: update.phone,
                service: update.service,
                id: update.id
            });
        }
        catch (error) {
            this.logger.error('Erro ao  atualizar  o cliente no banco', {
                error,
                operation: 'UPDATE',
                entity: 'CustomerEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível atualizar o cliente. Tente novamente.`);
        }
    }
    async delete(id) {
        try {
            await this.prisma.customer.delete({
                where: {
                    id,
                },
            });
            return;
        }
        catch (error) {
            this.logger.error('Erro ao excluir  cliente  no banco', {
                error,
                operation: 'DELETE',
                entity: 'CustomerEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível excluir o cliente. Tente novamente.`);
        }
    }
};
exports.CustomerRepo = CustomerRepo;
exports.CustomerRepo = CustomerRepo = CustomerRepo_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], CustomerRepo);
//# sourceMappingURL=customer.repo.js.map