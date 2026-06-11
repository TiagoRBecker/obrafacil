"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCustomerRepository = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const customer_entity_1 = require("../entity/customer.entity");
let InMemoryCustomerRepository = class InMemoryCustomerRepository {
    constructor() {
        this.customers = new Map();
    }
    async create(customer) {
        const id = customer.id || (0, node_crypto_1.randomUUID)();
        const entity = customer_entity_1.CustomerEntity.toDTO({ ...customer.toJSON(), id });
        this.customers.set(id, entity);
        return entity;
    }
    async update(id, customer) {
        const entity = customer_entity_1.CustomerEntity.toDTO({ ...customer.toJSON(), id });
        this.customers.set(id, entity);
        return entity;
    }
    async findById(id) {
        return this.customers.get(id) ?? null;
    }
    async findByPhone(phone) {
        for (const customer of this.customers.values()) {
            if (customer.phone === phone) {
                return customer;
            }
        }
        return null;
    }
    async findAll(skip, take) {
        const values = [...this.customers.values()];
        return {
            data: values.map((customer) => ({ customer, orders: [] })),
            total: values.length,
        };
    }
    async delete(id) {
        this.customers.delete(id);
    }
};
exports.InMemoryCustomerRepository = InMemoryCustomerRepository;
exports.InMemoryCustomerRepository = InMemoryCustomerRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryCustomerRepository);
//# sourceMappingURL=in-memory-customer.repository.js.map