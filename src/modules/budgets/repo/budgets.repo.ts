import { Injectable } from '@nestjs/common';

import { BudgetEntity, BudgetEntityProps } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from './budget.repository.interface';
import { TypeCharge } from '../dto/create-budget.dto';
import { PrismaService } from '../../../db/prisma';

@Injectable()
export class BudgetRepo extends BudgetRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(budget: BudgetEntity): Promise<BudgetEntity> {
    const created = await this.prisma.order.create({
      data: {
        title: budget.title,
        description: budget.description,
        customerId: budget.customerId,
        materials: { create: budget.materials },
        address: budget.address,
        endDate: budget.endDate,
        estimatedHours: budget.estimatedHours,
        finalObservations: budget.finalObservations,
        initDate: budget.initDate,
        name: budget.name,
        numberEmployees: budget.numberEmployees,
        observations: budget.observations,
        phone: budget.phone,
        typeCharge: budget.typeCharge,
        validityDate: budget.validityDate,
        valueHour: budget.valueHour,
        discount: budget.discount,
        laborValue: budget.laborValue,
        totalValue: budget.totalValue,
        materialValue: budget.materialValue,
      },
      include: { materials: true },
    });

    return BudgetEntity.create({
      ...created,
      typeCharge: created.typeCharge as TypeCharge,
      initDate: created.initDate,
      endDate: created.endDate,
      validityDate: created.validityDate,
      discount: created.discount ?? 0,
      laborValue: created.laborValue ?? 0,
      totalValue: created.totalValue ?? 0,
      materialValue: created.materialValue ?? 0,
      customerId: created.customerId ?? '',
    });
  }

  async findAll(): Promise<BudgetEntity[]> {
    const data = await this.prisma.order.findMany({
      select: {
        id: true,
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

    return data.map((order) =>
      BudgetEntity.toDTO({
        ...order,
        laborValue: order.laborValue ?? 0,
        materialValue: order.materialValue ?? 0,
        totalValue: order.totalValue ?? 0,
        discount: order.discount ?? 0,
        customerId: order.customerId ?? '',
        status: order.status ?? '',
      }),
    );
  }

  async findByCustomerAndStartDate(
    customerId: string,
    date: string,
  ): Promise<BudgetEntity | null> {
    const order = await this.prisma.order.findUnique({
      where: { customerId_initDate: { customerId, initDate: date } },
      include: { materials: true },
    });

    if (!order) return null;

    return BudgetEntity.toDTO({
      ...order,
      address: order.address,
      description: order.description,
      endDate: order.endDate,
      estimatedHours: order.estimatedHours,
      finalObservations: order.finalObservations,
      materials: order.materials,
      laborValue: order.laborValue ?? 0,
      materialValue: order.materialValue ?? 0,
      totalValue: order.totalValue ?? 0,
      discount: order.discount ?? 0,
      customerId: order.customerId ?? '',
    } as BudgetEntityProps);
  }

  async findById(id: string): Promise<BudgetEntity | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        materials: true,
        customer: { select: { phone: true } },
      },
    });

    if (!order) return null;

    return BudgetEntity.toDTO({
      ...order,
      id: order.id,
      laborValue: order.laborValue ?? 0,
      materialValue: order.materialValue ?? 0,
      totalValue: order.totalValue ?? 0,
      discount: order.discount ?? 0,
      customerId: order.customerId ?? '',
      materials: order.materials,
      phone: order.customer?.phone,
    } as BudgetEntityProps);
  }

  async update(
    id: string,
    budget: Omit<BudgetEntity, 'id' | 'customerId'>,
  ): Promise<BudgetEntity> {
    const updated = await this.prisma.order.update({
      where: { id },
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
        typeCharge: budget.typeCharge,
        initDate: budget.initDate,
        endDate: budget.endDate,
        validityDate: budget.validityDate,
        discount: budget.discount,
        laborValue: budget.laborValue,
        totalValue: budget.totalValue,
        materialValue: budget.materialValue,
        materials: {
          deleteMany: {},
          createMany: { data: budget.materials },
        },
      },
      include: { materials: true },
    });

    return BudgetEntity.toDTO({
      ...updated,
      materials: updated.materials,
    } as BudgetEntityProps);
  }

  async updateStatus(id: string): Promise<void> {
    await this.prisma.order.update({
      where: { id },
      data: { status: 'ENVIADO' },
    });
  }

  async createTrackingMessage(messageId: string, orderId: string): Promise<void> {
    await this.prisma.messageTracking.create({
      data: { messageId, orderId },
    });
  }

  async findMessageTracking(
    messageId: string,
  ): Promise<{ id: number; orderId: string; messageId: string } | null> {
    return this.prisma.messageTracking.findUnique({
      where: { messageId },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }
}
