"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../db/prisma");
const metrics_repository_interface_1 = require("./metrics-repository.interface");
let MetricsRepo = class MetricsRepo extends metrics_repository_interface_1.MetricsRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async getMetrics() {
        const [totalCustomers, totalOrders, totalTeamMembers] = await this.prisma.$transaction([
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
    async getMonthlyConversion() {
        const rows = await this.prisma.$queryRaw `
      SELECT
        TO_CHAR("createdAt", 'YYYY-MM') AS month,
        status,
        COUNT(*)::bigint AS count
      FROM orders
      WHERE "createdAt" >= DATE_TRUNC('year', CURRENT_DATE)
      GROUP BY month, status
      ORDER BY month ASC
    `;
        const map = new Map();
        for (const row of rows) {
            if (!map.has(row.month)) {
                map.set(row.month, { sent: 0, approved: 0 });
            }
            const entry = map.get(row.month);
            if (row.status === 'ENVIADO')
                entry.sent += Number(row.count);
            if (row.status === 'APROVADO')
                entry.approved += Number(row.count);
        }
        return Array.from(map.entries()).map(([month, data]) => ({
            month,
            ...data,
        }));
    }
    async getRecentOrders() {
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
};
exports.MetricsRepo = MetricsRepo;
exports.MetricsRepo = MetricsRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], MetricsRepo);
//# sourceMappingURL=metrics.repo.js.map