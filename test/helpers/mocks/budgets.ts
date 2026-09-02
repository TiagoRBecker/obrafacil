import { TypeCharge } from '../../../src/modules/budgets/dto/create-budget.dto';

export const orderDto = (customerId: string) => {
  return {
    name: 'João da Silva',
    phone: '(51) 99999-1234',
    address: 'Rua das Acácias, 150 - Centro',
    observations: 'Cliente solicitou atendimento pela manhã.',
    valueHour: 85,
    estimatedHours: 40,
    numberEmployees: 2,
    title: 'Instalação Elétrica Residencial',
    description: 'Instalação de tomadas, iluminação e quadro de distribuição.',
    typeCharge: TypeCharge.HORA,
    materials: [
      {
        name: 'Cabo Flexível 2,5mm',
        unit: 'metro',
        quantity: 120,
        unitPrice: 3.5,
      },
      {
        name: 'Disjuntor 32A',
        unit: 'unidade',
        quantity: 2,
        unitPrice: 45,
      },
    ],
    initDate: '2026-06-10T00:00:00.000Z',
    endDate: '2026-06-20T00:00:00.000Z',
    validityDate: '2026-07-20T00:00:00.000Z',
    customerId: customerId,

    discount: 150,
    finalObservations: 'Garantia de 90 dias para mão de obra.',
    laborValue: 6800,
    materialValue: 510,
    totalValue: 7160,
  };
};
