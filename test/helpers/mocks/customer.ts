import { ServiceTypeEnum } from "../../../src/modules/customers/dto/create-customer.dto";

 export const customerMockDto = {
    name: 'Diego Shell',
    phone: '(51) 99999-8888',
    service: ServiceTypeEnum.ELECTRICAL,
    address: 'Rua de Teste, 10',
    city: 'Porto Alegre',
  };