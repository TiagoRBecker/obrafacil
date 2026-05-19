import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { BudgetEntity, BudgetEntityProps } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from './budget.repository.interface';
import { TypeCharge } from '../dto/create-budget.dto';
import { PrismaService } from '../../../db/prisma';
import { BudgetMapper } from '../usecase/budget.mapper';
@Injectable()
export class BudgetRepo extends BudgetRepositoryInterface {
  private readonly logger = new Logger(BudgetRepo.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(budget: BudgetEntity): Promise<BudgetEntity> {
    const {
      title,
      description,
      materials,
      address,
      discount,
      endDate,
      estimatedHours,
      finalObservations,
      initDate,
      name,
      numberEmployees,
      observations,
      phone,
      typeCharge,
      validityDate,
      valueHour,
      laborValue,
      materialValue,
      totalValue,
      customerId,
    } = budget;
    try {
      const create = await this.prisma.order.create({
        data: {
          title,
          description,
          customerId,
          materials: {
            create: materials,
          },
          address,
          endDate,
          estimatedHours,
          finalObservations,
          initDate,
          name,
          numberEmployees,
          observations,
          phone,
          typeCharge,
          validityDate,
          valueHour,
          discount,
          laborValue,
          totalValue,
          materialValue,
        },
        include: {
          materials: true,
        },
      });

      const data = BudgetEntity.create({
        ...create,
        typeCharge: create.typeCharge as TypeCharge,
        initDate: create.initDate,
        endDate: create.endDate,
        validityDate: create.validityDate,
        discount: create.discount as number,
        laborValue: create.laborValue as number,
        totalValue: create.totalValue as number,
        materialValue: create.materialValue as number,
        customerId: create.customerId as string,
      });
      this.logger.log('Ordem de serviço criada com sucesso ');
      return data;
    } catch (error) {
      this.logger.error('Erro ao criar orçamento no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }

  async findAll(): Promise<BudgetEntity[]> {
    try {
      const data = await this.prisma.order.findMany({
        select: {
          id: true,
          // Dados do Cliente
          name: true,
          phone: true,
          address: true,
          observations: true,

          title: true,
          description: true,
          valueHour: true,
          estimatedHours: true,
          numberEmployees: true,
          typeCharge: true,
          updatedAt: true,
          customerId: true,
          materials: true,
          initDate: true,
          endDate: true,
          validityDate: true,
          totalValue: true,
          laborValue: true,
          materialValue: true,
          discount: true,
          finalObservations: true,
          createdAt: true,
          status: true,
        },
      });

      const mapper = data.map((order) => {
        return BudgetEntity.toDTO({
          ...order,
          laborValue: order.laborValue ?? 0,
          materialValue: order.materialValue ?? 0,
          totalValue: order.totalValue ?? 0,
          discount: order.discount ?? 0,
          customerId: order.customerId as string,
          status: order.status as string,
        });
      });

      return mapper;
    } catch (error) {
      this.logger.error('Erro ao criar orçamento no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
  async findByCustomerAndStartDate(
    customerId: string,
    date: string,
  ): Promise<BudgetEntity | null> {
    try {
      const existOrderInitiDate = await this.prisma.order.findUnique({
        where: {
          customerId_initDate: {
            customerId,
            initDate: date,
          },
        },
        include: {
          materials: true,
        },
      });
      return BudgetEntity.toDTO({
        ...existOrderInitiDate,
        address: existOrderInitiDate?.address,
        description: existOrderInitiDate?.description,
        endDate: existOrderInitiDate?.endDate,
        estimatedHours: existOrderInitiDate?.estimatedHours,
        finalObservations: existOrderInitiDate?.finalObservations,
        materials: existOrderInitiDate?.materials,
        laborValue: existOrderInitiDate?.laborValue ?? 0,
        materialValue: existOrderInitiDate?.materialValue ?? 0,
        totalValue: existOrderInitiDate?.totalValue ?? 0,
        discount: existOrderInitiDate?.discount ?? 0,
        customerId: existOrderInitiDate?.customerId as string,
      } as BudgetEntityProps);
    } catch (error) {
      this.logger.error('Erro ao criar orçamento no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
  async findById(id: string): Promise<BudgetEntity | null> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id,
        },

        include: {
          materials: true,
          customer: {
            select: {
              phone: true,
            },
          },
        },
      });
      return BudgetEntity.toDTO({
        ...order,
        id: order?.id,
        laborValue: order?.laborValue ?? 0,
        materialValue: order?.materialValue ?? 0,
        totalValue: order?.totalValue ?? 0,
        discount: order?.discount ?? 0,
        customerId: order?.customerId as string,
        materials: order?.materials,
        phone: order?.customer?.phone,
      } as BudgetEntityProps);
    } catch (error) {
      this.logger.error('Erro ao criar orçamento no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
  async update(
    id: string,
    budget: Omit<BudgetEntity, 'id' | 'customerId'>,
  ): Promise<BudgetEntity> {
    try {
      const update = await this.prisma.order.update({
        where: {
          id,
        },
        data: {
          finalObservations: budget.finalObservations,
          name: budget.name,
          observations: budget.observations,
          address: budget.address,
          title: budget.title,
          valueHour: budget.valueHour,
          description: budget.description,
          estimatedHours: budget.estimatedHours,
          numberEmployees: budget.numberEmployees,
          typeCharge: budget.typeCharge as TypeCharge,
          initDate: budget.initDate,
          endDate: budget.endDate,
          validityDate: budget.validityDate,
          discount: budget.discount as number,
          laborValue: budget.laborValue as number,
          totalValue: budget.totalValue as number,
          materialValue: budget.materialValue as number,
          materials: {
            deleteMany: {},
            createMany: {
              data: budget.materials,
            },
          },
        },
        include: {
          materials: true,
        },
      });
      return BudgetEntity.toDTO({
        ...update,
        materials: update.materials,
      } as BudgetEntityProps);
    } catch (error) {
      this.logger.error('Erro ao criar orçamento no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
  async updateStatus(id: string): Promise<void> {
    try {
      await this.prisma.order.update({
        where: { id },
        data: {
          status: 'ENVIADO',
        },
      });
} catch (error) {
      this.logger.error(
        'Erro ao criar atualizar o status da ordem  no banco',
        error,
      );
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
  async createTrackingMessage(
    messageId: string,
    orderId: string,
  ): Promise<void> {
    try {
      await this.prisma.messageTracking.create({
        data: {
          messageId,
          orderId,
        },
      });
      return;
    } catch (error) {
      this.logger.error('Erro ao criar  o tracker da message no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
  async findMessageTracking(
    messageId: string,
  ): Promise<{ id: number; orderId: string; messageId: string } | null> {
    try {
      const track = await this.prisma.messageTracking.findUnique({
        where: {
          messageId,
        },
      });
      return track;
    } catch (error) {
      this.logger.error('Erro ao criar  o tracker da message no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.prisma.order.delete({ where: { id } });
      return;
    } catch (error) {
      this.logger.error('Erro ao deletar orçamento no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
}
