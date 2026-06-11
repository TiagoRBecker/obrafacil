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
var GetMetricsUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMetricsUseCase = void 0;
const common_1 = require("@nestjs/common");
const metrics_repository_interface_1 = require("../repo/metrics-repository.interface");
let GetMetricsUseCase = GetMetricsUseCase_1 = class GetMetricsUseCase {
    constructor(metricsRepository) {
        this.metricsRepository = metricsRepository;
        this.logger = new common_1.Logger(GetMetricsUseCase_1.name);
    }
    async execute() {
        this.logger.log('Buscando métricas do dashboard');
        const metrics = await this.metricsRepository.getMetrics();
        this.logger.log(`Métricas: ${metrics.totalCustomers} clientes, ${metrics.totalOrders} orçamentos, ${metrics.totalTeamMembers} membros`);
        return metrics;
    }
};
exports.GetMetricsUseCase = GetMetricsUseCase;
exports.GetMetricsUseCase = GetMetricsUseCase = GetMetricsUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [metrics_repository_interface_1.MetricsRepositoryInterface])
], GetMetricsUseCase);
//# sourceMappingURL=get-metrics.usecase.js.map