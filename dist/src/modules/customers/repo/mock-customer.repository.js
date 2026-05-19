"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const customer_entity_1 = require("../entity/customer.entity");
let MockCustomerRepository = class MockCustomerRepository {
    constructor() {
        this.customers = new Map([
            [
                'customer-1',
                customer_entity_1.CustomerEntity.create({
                    name: 'Roberto Almeida',
                    phone: '(11) 99999-9999',
                    address: 'Rua das Flores, 123 - Sao Paulo',
                    service: 'Nome do servico',
                    city: 'Cidade',
                }),
            ],
            [
                'customer-2',
                customer_entity_1.CustomerEntity.create({
                    name: 'Fernanda Lima',
                    phone: '(11) 98888-7777',
                    address: 'Av. Central, 456 - Campinas',
                    service: 'Nome do servico',
                    city: 'Cidade',
                }),
            ],
        ]);
    }
    async create(customer) {
        this.customers.set(customer.id, customer);
        return customer;
    }
    async update(id, customer) {
        this.customers.set(customer.id, customer);
        return customer;
    }
    async findById(id) {
        return this.customers.get(id) ?? null;
    }
    async findByphone(id) {
        return this.customers.get(id) ?? null;
    }
    async findAll() {
        return [...this.customers.values()];
    }
    async delete(id) {
        this.customers.delete(id);
    }
};
exports.MockCustomerRepository = MockCustomerRepository;
exports.MockCustomerRepository = MockCustomerRepository = __decorate([
    (0, common_1.Injectable)()
], MockCustomerRepository);
//# sourceMappingURL=mock-customer.repository.js.map