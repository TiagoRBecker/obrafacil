import { MetricsRepositoryInterface } from '../repo/metrics-repository.interface';
import { MetricsResponseDto } from '../dto/metrics-response.dto';
export declare class GetMetricsUseCase {
    private readonly metricsRepository;
    private readonly logger;
    constructor(metricsRepository: MetricsRepositoryInterface);
    execute(): Promise<MetricsResponseDto>;
}
