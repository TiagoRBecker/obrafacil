export interface BudgetMaterialItemProps {
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
}

export interface BudgetResponseDto {
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
  customerId: string;
  //total
  createdAt: Date;
  laborValue: number;
  materialValue: number;
  totalValue: number;
}