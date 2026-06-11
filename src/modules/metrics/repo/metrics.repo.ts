import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import {
  MetricsRepositoryInterface,
  MetricsData,
} from './metrics-repository.interface';

@Injectable()
export class MetricsRepo extends MetricsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async getMetrics(): Promise<MetricsData> {
    const [totalCustomers, totalOrders, totalTeamMembers] =
      await this.prisma.$transaction([
        this.prisma.customer.count(),
        this.prisma.order.count(),
        this.prisma.team.count(),
      ]);

    const approvedAgg = await this.prisma.order.aggregate({
      where: { status: 'APROVADO' },
      _sum: { totalValue: true },
    });
    const approvedRevenue = approvedAgg._sum.totalValue ?? 0;

    const monthlyConversion = await this.getMonthlyConversion();
    const recentOrders = await this.getRecentOrders();

    return {
      totalCustomers,
      totalOrders,
      totalTeamMembers,
      approvedRevenue,
      monthlyConversion,
      recentOrders,
    };
  }

  private async getMonthlyConversion(): Promise<
    { month: string; sent: number; approved: number }[]
  > {
    const rows = await this.prisma.$queryRaw<
      { month: string; status: string; count: bigint }[]
    >`
      SELECT
        TO_CHAR("createdAt", 'YYYY-MM') AS month,
        status,
        COUNT(*)::bigint AS count
      FROM orders
      WHERE "createdAt" >= DATE_TRUNC('year', CURRENT_DATE)
      GROUP BY month, status
      ORDER BY month ASC
    `;

    const map = new Map<string, { sent: number; approved: number }>();

    for (const row of rows) {
      if (!map.has(row.month)) {
        map.set(row.month, { sent: 0, approved: 0 });
      }
      const entry = map.get(row.month)!;
      if (row.status === 'ENVIADO') entry.sent += Number(row.count);
      if (row.status === 'APROVADO') entry.approved += Number(row.count);
    }

    return Array.from(map.entries()).map(([month, data]) => ({
      month,
      ...data,
    }));
  }

  private async getRecentOrders() {
    const orders = await this.prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        name: true,
        totalValue: true,
        status: true,
        createdAt: true,
      },
    });

    return orders.map((o) => ({
      id: o.id,
      title: o.title,
      clientName: o.name,
      totalValue: o.totalValue ?? 0,
      status: o.status ?? 'PENDENTE',
      createdAt: o.createdAt,
    }));
  }
}
