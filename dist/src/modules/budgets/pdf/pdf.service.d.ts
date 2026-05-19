import { BudgetResponseDto } from '../dto/budget-response.dto';
export declare class PdfService {
    private readonly logger;
    generateBudgetPdf(data: BudgetResponseDto): Promise<string>;
}
