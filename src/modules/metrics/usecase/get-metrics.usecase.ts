import { Injectable, Logger } from '@nestjs/common';
import { MetricsRepositoryInterface } from '../repo/metrics-repository.interface';
import { MetricsResponseDto } from '../dto/metrics-response.dto';

@Injectable()
export class GetMetricsUseCase {
  private readonly logger = new Logger(GetMetricsUseCase.name);

  constructor(
    private readonly metricsRepository: MetricsRepositoryInterface,
  ) {}

  async execute(): Promise<MetricsResponseDto> {
    this.logger.log('Buscando métricas do dashboard');

    const metrics = await this.metricsRepository.getMetrics();

    this.logger.log(
      `Métricas: ${metrics.totalCustomers} clientes, ${metrics.totalOrders} orçamentos, ${metrics.totalTeamMembers} membros`,
    );

    return metrics;
  }
}
