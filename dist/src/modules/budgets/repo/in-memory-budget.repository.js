"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryBudgetRepository = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const budget_entity_1 = require("../entity/budget.entity");
let InMemoryBudgetRepository = class InMemoryBudgetRepository {
    constructor() {
        this.budgets = new Map();
    }
    async create(budget) {
        const id = budget.id || (0, node_crypto_1.randomUUID)();
        const entity = budget_entity_1.BudgetEntity.toDTO({ ...budget.toJSON(), id });
        this.budgets.set(id, entity);
        return entity;
    }
    async update(id, budget) {
        const entity = budget_entity_1.BudgetEntity.toDTO({ ...budget.toJSON(), id });
        this.budgets.set(id, entity);
        return entity;
    }
    async findById(id) {
        return this.budgets.get(id) ?? null;
    }
    async findByCustomerAndStartDate(customerId, date) {
        return null;
    }
    async findAll(skip, take) {
        const values = [...this.budgets.values()];
        return {
            data: values.slice(skip, skip + take),
            total: values.length,
        };
    }
    async createTrackingMessage(messageId, orerId) {
        throw "";
    }
    async findMessageTracking(messageId) {
        throw "";
    }
    async delete(id) {
        this.budgets.delete(id);
    }
    async updateStatus(id) {
        throw "";
    }
};
exports.InMemoryBudgetRepository = InMemoryBudgetRepository;
exports.InMemoryBudgetRepository = InMemoryBudgetRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryBudgetRepository);
//# sourceMappingURL=in-memory-budget.repository.js.map