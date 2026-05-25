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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderMaterialDto {
  @ApiProperty({ description: 'Nome do material', example: 'Cimento CP-II 50kg' })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ description: 'Unidade de medida', example: 'saco' })
  @IsString()
  @MinLength(1)
  unit!: string;

  @ApiProperty({ description: 'Quantidade', example: 10 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  quantity!: number;

  @ApiProperty({ description: 'Preço unitário', example: 32.5 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitPrice!: number;
}

export enum TypeCharge {
  HORA = 'hora',
  DIARIA = 'diaria',
  SERVICO = 'servico',
}

export class CreateOrderDto {
  @ApiPropertyOptional({ description: 'ID do orçamento (gerado automaticamente se omitido)' })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'Nome do cliente', example: 'Maria Oliveira' })
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({ description: 'Telefone do cliente', example: '(11) 99999-8888' })
  @IsString()
  @MinLength(1)
  phone!: string;

  @ApiProperty({ description: 'Endereço do serviço', example: 'Rua das Flores, 123' })
  @IsString()
  @MinLength(1)
  address!: string;

  @ApiProperty({ description: 'Observações sobre o cliente ou serviço', example: 'Cliente referenciado pelo João' })
  @IsString()
  @MinLength(1)
  observations!: string;

  @ApiProperty({ description: 'Valor da hora de mão de obra', example: 85.0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valueHour!: number;

  @ApiProperty({ description: 'Horas estimadas para o serviço', example: 40 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  estimatedHours!: number;

  @ApiProperty({ description: 'Número de funcionários envolvidos', example: 2 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  numberEmployees!: number;

  @ApiProperty({ description: 'Título do orçamento', example: 'Reforma do banheiro' })
  @IsString()
  @MinLength(1)
  title!: string;

  @ApiProperty({ description: 'Descrição detalhada do serviço', example: 'Reforma completa incluindo troca de revestimentos...' })
  @IsString()
  @MinLength(1)
  description!: string;

  @ApiProperty({ description: 'Tipo de cobrança', enum: TypeCharge, example: TypeCharge.SERVICO })
  @IsEnum(TypeCharge)
  typeCharge!: TypeCharge;

  @ApiProperty({ description: 'Lista de materiais do orçamento', type: [OrderMaterialDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderMaterialDto)
  materials!: OrderMaterialDto[];

  @ApiProperty({ description: 'Data de início do serviço', example: '2026-06-01' })
  @IsDateString()
  initDate!: string;

  @ApiProperty({ description: 'Data de término do serviço', example: '2026-06-30' })
  @IsDateString()
  endDate!: string;

  @ApiProperty({ description: 'ID do cliente associado', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @MinLength(1)
  customerId!: string;

  @ApiProperty({ description: 'Data de validade do orçamento', example: '2026-07-15' })
  @IsDateString()
  validityDate!: string;

  @ApiPropertyOptional({ description: 'Desconto aplicado', example: 150.0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  discount?: number;

  @ApiProperty({ description: 'Observações finais', example: 'Orçamento válido por 30 dias' })
  @IsString()
  @MinLength(1)
  finalObservations!: string;

  @ApiPropertyOptional({ description: 'Valor da mão de obra (calculado automaticamente se não informado)', example: 3400.0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  laborValue!: number;

  @ApiPropertyOptional({ description: 'Valor dos materiais (calculado automaticamente se não informado)', example: 1200.0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  materialValue!: number;

  @ApiPropertyOptional({ description: 'Valor total do orçamento (calculado automaticamente se não informado)', example: 4450.0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalValue!: number;
}
