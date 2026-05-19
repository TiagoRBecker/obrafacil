"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockBudgetRepository = void 0;
const common_1 = require("@nestjs/common");
const create_budget_dto_1 = require("../dto/create-budget.dto");
const budget_entity_1 = require("../entity/budget.entity");
let MockBudgetRepository = class MockBudgetRepository {
    constructor() {
        this.budgets = new Map([
            [
                'budget-1',
                budget_entity_1.BudgetEntity.create({
                    name: 'Roberto Almeida',
                    phone: '(11) 99999-9999',
                    address: 'Rua das Flores, 123',
                    observations: 'Client prefers morning visits',
                    title: 'Residential Electrical Installation',
                    description: 'Complete electrical installation for a 120m² residence.',
                    initDate: new Date(),
                    endDate: new Date(),
                    validityDate: new Date(),
                    typeCharge: create_budget_dto_1.TypeCharge.HORA,
                    estimatedHours: 16,
                    valueHour: 120,
                    numberEmployees: 2,
                    totalValue: 123,
                    laborValue: 123,
                    materialValue: 123,
                    customerId: '1234567',
                    materials: [
                        {
                            name: 'Circuit breaker',
                            unit: 'un',
                            quantity: 4,
                            unitPrice: 35,
                        },
                    ],
                    discount: 50,
                    finalObservations: 'Payment in two installments.',
                }),
            ],
        ]);
    }
    async create(budget) {
        this.budgets.set('budget-1', budget);
        return budget;
    }
    async update(id, budget) {
        this.budgets.set('budget-1', budget);
        return budget;
    }
    async findById(id) {
        return this.budgets.get(id) ?? null;
    }
    async findAll() {
        return [...this.budgets.values()];
    }
    async findByCustomerAndStartDate(customerId, date) {
        throw 'not';
    }
    async findMessageTracking(messageId) {
        throw 'not';
    }
    async createTrackingMessage(messageId, orerId) {
        throw '';
    }
    async delete(id) {
        this.budgets.delete(id);
    }
    async updateStatus(id) {
        throw '';
    }
};
exports.MockBudgetRepository = MockBudgetRepository;
exports.MockBudgetRepository = MockBudgetRepository = __decorate([
    (0, common_1.Injectable)()
], MockBudgetRepository);
//# sourceMappingURL=mock-budget.repository.js.map