export declare class OrderMaterialDto {
    name: string;
    unit: string;
    quantity: number;
    unitPrice: number;
}
export declare enum TypeCharge {
    HORA = "hora",
    DIARIA = "diaria",
    SERVICO = "servico"
}
export declare class CreateOrderDto {
    id?: string;
    name: string;
    phone: string;
    address: string;
    observations: string;
    valueHour: number;
    estimatedHours: number;
    numberEmployees: number;
    title: string;
    description: string;
    typeCharge: TypeCharge;
    materials: OrderMaterialDto[];
    initDate: string;
    endDate: string;
    customerId: string;
    validityDate: string;
    discount?: number;
    finalObservations: string;
    laborValue: number;
    materialValue: number;
    totalValue: number;
}
