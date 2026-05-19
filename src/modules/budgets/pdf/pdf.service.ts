import { Injectable, Logger } from '@nestjs/common';

import { BudgetResponseDto } from '../dto/budget-response.dto';


@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  async generateBudgetPdf(data: BudgetResponseDto): Promise<string> {
    this.logger.log(`Gerando PDF para orçamento: ${data.id}`);

  

    this.logger.log(`PDF gerado com sucesso: ${data.id}`);
    return  "ok" ;
  }
}