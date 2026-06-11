declare class MonthlyConversionDto {
    month: string;
    sent: number;
    approved: number;
}
declare class RecentOrderDto {
    id: string;
    title: string;
    clientName: string;
    totalValue: number;
    status: string;
    createdAt: Date;
}
export declare class MetricsResponseDto {
    totalCustomers: number;
    totalOrders: number;
    totalTeamMembers: number;
    approvedRevenue: number;
    monthlyConversion: MonthlyConversionDto[];
    recentOrders: RecentOrderDto[];
}
export {};
