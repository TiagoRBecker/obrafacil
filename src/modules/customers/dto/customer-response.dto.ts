import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty({ description: 'ID único do cliente', example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ description: 'Nome do cliente', example: 'Carlos Almeida' })
  name!: string;

  @ApiProperty({ description: 'Telefone do cliente', example: '(11) 98765-4321' })
  phone!: string;

  @ApiPropertyOptional({ description: 'Endereço do cliente', example: 'Av. Paulista, 1000' })
  address?: string;

  @ApiPropertyOptional({ description: 'Data de criação do registro' })
  createdAt?: Date;

  @ApiPropertyOptional({ description: 'Data da última atualização' })
  updatedAt?: Date;

  @ApiProperty({ description: 'Tipo de serviço', example: 'electrical' })
  service!: string;

  @ApiProperty({ description: 'Cidade do cliente', example: 'São Paulo' })
  city!: string;

  @ApiPropertyOptional({ description: 'Orçamentos associados ao cliente' })
  orders?: any[];
}
