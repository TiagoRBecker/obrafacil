"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetMapper = void 0;
class BudgetMapper {
    static toResponse(budget) {
        return {
            customerName: budget.name,
            customerPhone: budget.phone,
            customerAddress: budget.address,
            customerNotes: budget.observations,
            title: budget.title,
            description: budget.description,
            startDate: budget.initDate,
            endDate: budget.endDate,
            validityDate: budget.validityDate,
            typeCharge: budget.typeCharge,
            estimatedQuantity: budget.estimatedHours,
            rateAmount: budget.valueHour,
            professionalsCount: budget.numberEmployees,
            materials: budget.materials.map((material) => ({ ...material })),
            finalNotes: budget.finalObservations,
            totalValue: budget.totalValue ?? 0,
            laborValue: budget.laborValue,
            materialValue: budget.materialValue,
        };
    }
    static toResponseList(budget) {
        return budget.map((budget) => {
            return {
                id: budget.id,
                name: budget.name,
                phone: budget.phone,
                address: budget.address,
                observations: budget.observations,
                title: budget.title,
                description: budget.description,
                initDate: budget.initDate,
                endDate: budget.endDate,
                validityDate: budget.validityDate,
                discount: budget.discount ?? 0,
                typeCharge: budget.typeCharge,
                estimatedHours: budget.estimatedHours,
                v: budget.valueHour,
                numberEmployees: budget.numberEmployees,
                materials: budget?.materials.map((material) => ({
                    ...material,
                })),
                finalObservations: budget.finalObservations,
                totalValue: budget.totalValue ?? 0,
                laborValue: budget.laborValue ?? 0,
                materialValue: budget.materialValue ?? 0,
            };
        });
    }
}
exports.BudgetMapper = BudgetMapper;
//# sourceMappingURL=budget.mapper.js.map