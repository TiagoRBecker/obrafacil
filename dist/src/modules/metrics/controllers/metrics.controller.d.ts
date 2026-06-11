import { GetMetricsUseCase } from '../usecase/get-metrics.usecase';
import { MetricsResponseDto } from '../dto/metrics-response.dto';
export declare class MetricsController {
    private readonly getMetricsUseCase;
    constructor(getMetricsUseCase: GetMetricsUseCase);
    execute(): Promise<MetricsResponseDto>;
}
