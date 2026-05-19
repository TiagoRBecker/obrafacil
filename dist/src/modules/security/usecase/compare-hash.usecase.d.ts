import { CompareHashDto } from '../dto/compare-hash.dto';
import { CompareHashResponseDto } from '../dto/compare-hash-response.dto';
export declare class CompareHashUseCase {
    execute(input: CompareHashDto): Promise<CompareHashResponseDto>;
}
