export interface BudgetMaterialItemProps {
    name: string;
    unit: string;
    quantity: number;
    unitPrice: number;
}
export interface BudgetResponseDto {
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
    customerId: string;
    createdAt: Date;
    laborValue: number;
    materialValue: number;
    totalValue: number;
}
