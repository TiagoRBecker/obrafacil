import { BudgetResponseDto } from '../dto/budget-response.dto';
import { TypeCharge } from '../dto/create-budget.dto';
import {
  BudgetEntity,
  BudgetEntityProps,
  BudgetMaterialItemProps,
} from '../entity/budget.entity';
import { Prisma, Order as PrismaOrder } from '@prisma/client';
export type OrderWithMaterials = Prisma.OrderGetPayload<{
  include: { materials: true };
}>;
export interface BudgetRawList {
  id: string;
  // Dados do Cliente
  name: string;
  phone: string;
  address: string;
  observations: string;

  // Dados do Serviço
  title: string;
  description: string;
  valueHour: number;
  estimatedHours: number;
  numberEmployees: number;
  typeCharge: string;

  // Datas e Materiais
  materials: BudgetMaterialItemProps[];
  initDate: Date;
  endDate: Date;
  validityDate: Date;

  // Finalização
  discount: number;
  finalObservations: string;

  //total

  laborValue: number;
  materialValue: number;
  totalValue: number;
}
export class BudgetMapper {
  static toResponse(budget: BudgetEntity) {
    return {
      customerName: budget.name,
      customerPhone: budget.phone,
      customerAddress: budget.address,
      customerNotes: budget.observations,
      title: budget.title,
      description: budget.description,
      startDate: budget.initDate,
      endDate: budget.endDate,
      validityDate: budget.validityDate,
      typeCharge: budget.typeCharge as TypeCharge,
      estimatedQuantity: budget.estimatedHours,
      rateAmount: budget.valueHour,
      professionalsCount: budget.numberEmployees,
      materials: budget.materials.map((material) => ({ ...material })),
      finalNotes: budget.finalObservations,
      totalValue: budget.totalValue ?? 0,
      laborValue: budget.laborValue,
      materialValue: budget.materialValue,
    };
  }
  static toResponseList(budget: OrderWithMaterials[]) {
    return budget.map((budget) => {
      return {
        id: budget.id,
        name: budget.name,
        phone: budget.phone,
        address: budget.address,
        observations: budget.observations,
        title: budget.title,
        description: budget.description,
        initDate: budget.initDate,
        endDate: budget.endDate,
        validityDate: budget.validityDate,
        discount: budget.discount ?? 0,
        typeCharge: budget.typeCharge as TypeCharge,
        estimatedHours: budget.estimatedHours,
        v: budget.valueHour,
        numberEmployees: budget.numberEmployees,
        materials: budget?.materials.map((material) => ({
          ...material,
        })),
        finalObservations: budget.finalObservations,
        totalValue: budget.totalValue ?? 0,
        laborValue: budget.laborValue ?? 0,
        materialValue: budget.materialValue ?? 0,
      };
    });
  }
}
 