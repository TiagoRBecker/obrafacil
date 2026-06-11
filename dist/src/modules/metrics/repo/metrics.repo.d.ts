import { PrismaService } from '../../../db/prisma';
import { MetricsRepositoryInterface, MetricsData } from './metrics-repository.interface';
export declare class MetricsRepo extends MetricsRepositoryInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMetrics(): Promise<MetricsData>;
    private getMonthlyConversion;
    private getRecentOrders;
}
