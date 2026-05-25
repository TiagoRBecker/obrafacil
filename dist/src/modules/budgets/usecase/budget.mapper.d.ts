import { TypeCharge } from '../dto/create-budget.dto';
import { BudgetEntity, BudgetMaterialItemProps } from '../entity/budget.entity';
import { Prisma } from '@prisma/client';
export type OrderWithMaterials = Prisma.OrderGetPayload<{
    include: {
        materials: true;
    };
}>;
export interface BudgetRawList {
    id: string;
    name: string;
    phone: string;
    address: string;
    observations: string;
    title: string;
    description: string;
    valueHour: number;
    estimatedHours: number;
    numberEmployees: number;
    typeCharge: string;
    materials: BudgetMaterialItemProps[];
    initDate: Date;
    endDate: Date;
    validityDate: Date;
    discount: number;
    finalObservations: string;
    laborValue: number;
    materialValue: number;
    totalValue: number;
}
export declare class BudgetMapper {
    static toResponse(budget: BudgetEntity): {
        customerName: string;
        customerPhone: string;
        customerAddress: string;
        customerNotes: string;
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
        validityDate: Date;
        typeCharge: TypeCharge;
        estimatedQuantity: number;
        rateAmount: number;
        professionalsCount: number;
        materials: {
            name: string;
            unit: string;
            quantity: number;
            unitPrice: number;
        }[];
        finalNotes: string;
        totalValue: number;
        laborValue: number;
        materialValue: number;
    };
    static toResponseList(budget: OrderWithMaterials[]): {
        id: string;
        name: string;
        phone: string;
        address: string;
        observations: string;
        title: string;
        description: string;
        initDate: Date;
        endDate: Date;
        validityDate: Date;
        discount: number;
        typeCharge: TypeCharge;
        estimatedHours: number;
        v: number;
        numberEmployees: number;
        materials: {
            id: string;
            updatedAt: Date;
            name: string;
            createdAt: Date;
            orderId: string;
            unit: string;
            quantity: number;
            unitPrice: number;
        }[];
        finalObservations: string;
        totalValue: number;
        laborValue: number;
        materialValue: number;
    }[];
}
