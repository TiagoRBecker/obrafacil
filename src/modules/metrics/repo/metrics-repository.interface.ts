export interface MonthlyConversion {
  month: string;
  sent: number;
  approved: number;
}

export interface RecentOrder {
  id: string;
  title: string;
  clientName: string;
  totalValue: number;
  status: string;
  createdAt: Date;
}

export interface MetricsData {
  totalCustomers: number;
  totalOrders: number;
  totalTeamMembers: number;
  approvedRevenue: number;
  monthlyConversion: MonthlyConversion[];
  recentOrders: RecentOrder[];
}

export abstract class MetricsRepositoryInterface {
  abstract getMetrics(): Promise<MetricsData>;
}
