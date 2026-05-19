import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  MinLength,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  IsDateString,
  isString,
} from 'class-validator';

export class OrderMaterialDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(1)
  unit!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  quantity!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitPrice!: number;
}

// Enum para o tipo de cobrança
export enum TypeCharge {
  HORA = 'hora',
  DIARIA = 'diaria',
  SERVICO = 'servico',
}

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  id?: string;
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @MinLength(1)
  phone!: string;

  @IsString()
  @MinLength(1)
  address!: string;

  @IsString()
  @MinLength(1)
  observations!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valueHour!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  estimatedHours!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  numberEmployees!: number;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsEnum(TypeCharge)
  typeCharge!: TypeCharge;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderMaterialDto) // Certifique-se de ter este DTO criado
  materials!: OrderMaterialDto[];

  @IsDateString()
  initDate!: string;

  @IsDateString()
  endDate!: string;

  @IsString()
  @MinLength(1)
  customerId!: string;

  @IsDateString()
  validityDate!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  discount?: number;

  @IsString()
  @MinLength(1)
  finalObservations!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  laborValue!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  materialValue!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalValue!: number;
}
