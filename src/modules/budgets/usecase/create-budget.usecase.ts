import { randomUUID } from 'node:crypto';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';

import { CustomerRepositoryInterface } from '../../customers/repo/customer.repo.inteface';

@Injectable()
export class CreateBudgetUseCase {
  private readonly logger = new Logger(CreateBudgetUseCase.name);

  constructor(
    private readonly budgetRepository: BudgetRepositoryInterface,
    private readonly customerRepo: CustomerRepositoryInterface,
  ) {}

  async execute(input: CreateOrderDto): Promise<BudgetEntity> {
    this.logger.log(`Iniciando criação de orçamento para cliente: ${input.customerId}`);
    
    const existCustomer = await this.customerRepo.findById(input.customerId);
    if (!existCustomer?.id) {
      this.logger.error(`Cliente não encontrado - ID: ${input.customerId}`);
      throw new NotFoundException(`Usuario nao encontrado `);
    }
  
    const orderInitiDate =
      await this.budgetRepository.findByCustomerAndStartDate(
        existCustomer.id as string,
        input.initDate,
      );
   
    if (orderInitiDate?.id) {
      this.logger.warn(`Conflito: cliente já possui obra agendada na data: ${input.initDate}`);
      throw new ConflictException(
        'O cliente ja possui uma obra  agendada com essa data inicial!',
      );
    }
    
    try {
      this.logger.log(`Criando orçamento - nome: ${input.name}`);
      const budget = BudgetEntity.create({
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
     

      const createdBudget = await this.budgetRepository.create(budget);
      this.logger.log(`Orçamento criado com sucesso - ID: ${createdBudget.id}`);
      return createdBudget;
    } catch (error) {
      this.logger.error(`Erro ao criar orçamento: ${error.message || error}`);
      throw new BadRequestException('Erro a criar a ordem de serviço ');
    }
  }
}
