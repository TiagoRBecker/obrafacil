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
exports.MetricsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MonthlyConversionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mês no formato YYYY-MM' }),
    __metadata("design:type", String)
], MonthlyConversionDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de orçamentos enviados no mês' }),
    __metadata("design:type", Number)
], MonthlyConversionDto.prototype, "sent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de orçamentos aprovados no mês' }),
    __metadata("design:type", Number)
], MonthlyConversionDto.prototype, "approved", void 0);
class RecentOrderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentOrderDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentOrderDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentOrderDto.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RecentOrderDto.prototype, "totalValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RecentOrderDto.prototype, "createdAt", void 0);
class MetricsResponseDto {
}
exports.MetricsResponseDto = MetricsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de clientes cadastrados' }),
    __metadata("design:type", Number)
], MetricsResponseDto.prototype, "totalCustomers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de orçamentos criados' }),
    __metadata("design:type", Number)
], MetricsResponseDto.prototype, "totalOrders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de membros da equipe' }),
    __metadata("design:type", Number)
], MetricsResponseDto.prototype, "totalTeamMembers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valor total dos orçamentos aprovados' }),
    __metadata("design:type", Number)
], MetricsResponseDto.prototype, "approvedRevenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Conversão mensal', type: [MonthlyConversionDto] }),
    __metadata("design:type", Array)
], MetricsResponseDto.prototype, "monthlyConversion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Últimos 6 orçamentos', type: [RecentOrderDto] }),
    __metadata("design:type", Array)
], MetricsResponseDto.prototype, "recentOrders", void 0);
//# sourceMappingURL=metrics-response.dto.js.map