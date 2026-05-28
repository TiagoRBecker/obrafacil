import { GenerateHashDto } from '../dto/generate-hash.dto';
export declare class GenerateHashUseCase {
    execute(input: GenerateHashDto): Promise<string>;
}
