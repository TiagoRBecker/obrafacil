import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ServiceTypeEnum {
  ELECTRICAL = 'electrical',
  RENOVATION = 'renovation',
  PAINTING = 'painting',
  INSTALLATION = 'installation',
  MASONRY = 'masonry',
  PLUMBING = 'plumbing',
  FINISHING = 'finishing',
}

export class CreateCustomerDto {
  @ApiProperty({ description: 'Nome do cliente', example: 'Carlos Almeida' })
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({ description: 'Telefone do cliente', example: '(11) 98765-4321' })
  @IsString()
  @Matches(/^[0-9()+\-\s]+$/, {
    message: 'phone must contain only numbers, spaces or common phone symbols',
  })
  phone!: string;

  @ApiProperty({ description: 'Tipo de serviço', enum: ServiceTypeEnum, example: ServiceTypeEnum.ELECTRICAL })
  @IsEnum(ServiceTypeEnum, {
    message: 'Tipo de serviço invalido ! Consulte  documentaçao para enviar o valor certo',
  })
  service!: ServiceTypeEnum;

  @ApiPropertyOptional({ description: 'Endereço do cliente', example: 'Av. Paulista, 1000' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Cidade do cliente', example: 'São Paulo' })
  @IsOptional()
  @IsString()
  city?: string;
}
