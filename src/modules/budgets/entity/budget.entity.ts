import { TypeCharge } from '../dto/create-budget.dto';

export interface BudgetMaterialItemProps {
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
}

export interface BudgetEntityProps {
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
  status?: string;
}

export class BudgetEntity {
  private constructor(private readonly props: BudgetEntityProps) {
    this.guard(props);
  }

  static create(
    props: Omit<BudgetEntityProps, 'id' | 'createdAt' | 'updateAt' | 'status'>,
  ): BudgetEntity {
    return new BudgetEntity({
      ...props,
      id: '',
      customerId: props.customerId,
      createdAt: new Date(),
      discount: props.discount,
      name: props.name.trim(),
      phone: props.phone.trim(),
      address: props.address.trim(),
      observations: props.observations.trim(),
      title: props.title.trim(),
      description: props.description.trim(),
      finalObservations: props.finalObservations.trim(),

      materials: props.materials.map((m) => ({
        ...m,
        name: m.name.trim(),
        unit: m.unit.trim(),
      })),
    });
  }

  get name(): string {
    return this.props.name;
  }
  get phone(): string {
    return this.props.phone;
  }
  get address(): string {
    return this.props.address;
  }
  get observations(): string {
    return this.props.observations;
  }
  get valueHour(): number {
    return this.props.valueHour;
  }
  get estimatedHours(): number {
    return this.props.estimatedHours;
  }
  get numberEmployees(): number {
    return this.props.numberEmployees;
  }
  get title(): string {
    return this.props.title;
  }
  get description(): string {
    return this.props.description;
  }
  get typeCharge(): string {
    return this.props.typeCharge;
  }
  get materials(): BudgetMaterialItemProps[] {
    return this.props.materials;
  }
  get initDate(): Date {
    return this.props.initDate;
  }
  get endDate(): Date {
    return this.props.endDate;
  }
  get validityDate(): Date {
    return this.props.validityDate;
  }
  get discount(): number | null {
    return this.props.discount;
  }
  get finalObservations(): string {
    return this.props.finalObservations;
  }
  get totalValue(): number {
    return this.props.totalValue;
  }
  get materialValue(): number {
    return this.props.materialValue;
  }
  get laborValue(): number {
    return this.props.laborValue;
  }
  get id(): string {
    return this.props.id;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get customerId(): string {
    return this.props.customerId;
  }
  get status(): string {
    return this.props.status as string;
  }

  static toDTO(props: BudgetEntityProps): BudgetEntity {
    return new BudgetEntity({
      ...props,
      id: props.id,
      createdAt: props.createdAt,
      discount: props.discount,
      laborValue: props.laborValue ?? 0,
      materialValue: props.materialValue,
      totalValue: props.totalValue,
      name: props.name,
      phone: props.phone,
      address: props.address,
      observations: props.observations,
      title: props.title,
      description: props.description,
      finalObservations: props.finalObservations,
      status: props.status,
      materials: props?.materials?.map((m) => ({
        ...m,
        name: m.name,
        unit: m.unit,
      })),
    });
  }

  toJSON() {
    return { ...this.props };
  }
  private guard(props: BudgetEntityProps) {
    if (props) {
      if (props.laborValue < 0)
        throw new Error('O valor da mão de obra não pode ser menor que 0 ');
      if (props.totalValue < 0)
        throw new Error('O valor total não pode ser menor que 0 ');
      if (props.materialValue < 0)
        throw new Error('O valor dos materiais não pode ser menor que 0 ');
    }
  }
}
