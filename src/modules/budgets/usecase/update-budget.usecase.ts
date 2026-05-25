import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
import { CreateOrderDto } from '../dto/create-budget.dto';
import { CustomerRepositoryInterface } from '../../customers/repo/customer-repository.interface';

@Injectable()
export class UpdateBudgetUseCase {
  private readonly logger = new Logger(UpdateBudgetUseCase.name);

  constructor(
    private readonly budgetRepository: BudgetRepositoryInterface,
    private readonly customerRepo: CustomerRepositoryInterface,
  ) {}

  async execute(id: string, input: CreateOrderDto): Promise<BudgetEntity> {
    this.logger.log(`Iniciando atualização do orçamento - ID: ${id}`);
    
    const existCustomer = await this.customerRepo.findById(input.customerId);
    if (!existCustomer?.id) {
      this.logger.error(`Cliente não encontrado - ID: ${input.customerId}`);
      throw new NotFoundException(`Usuario nao encontrado `);
    }
    
    const currentBudget = await this.budgetRepository.findById(id);

    if (!currentBudget?.id) {
      this.logger.error(`Orçamento não encontrado - ID: ${id}`);
      throw new NotFoundException('Budget not found.');
    }
    
    try {
      this.logger.log(`Atualizando orçamento - nome: ${input.name}`);
      const current = currentBudget.toJSON();
      const budget = BudgetEntity.create({
        ...current,
        name: input.name,
        phone: input.phone,
        address: input.address,
        observations: input.observations,
        title: input.title,
        description: input.description,
        valueHour: input.valueHour,
        estimatedHours: input.estimatedHours,
        numberEmployees: input.numberEmployees,
        typeCharge: input.typeCharge,
        materials: input.materials,
        discount: input.discount as number,
        initDate: new Date(input.initDate),
        endDate: new Date(input.endDate),
        validityDate: new Date(input.validityDate),
        finalObservations: input.finalObservations,
        laborValue: input.laborValue,
        materialValue: input.materialValue,
        totalValue: input.totalValue,
        customerId: existCustomer.id as string,
      });
      
      const savedBudget = await this.budgetRepository.update(currentBudget.id, budget);
      this.logger.log(`Orçamento atualizado com sucesso - ID: ${id}`);
      return savedBudget;
    } catch (error:any) {
      this.logger.error(`Erro ao atualizar orçamento - ID: ${id}, erro: ${error?.message || error}`);
      throw new BadRequestException(
        `Erro ao  atualizar  a ordem de serviço ${id}`,
      );
    }
  }
}
