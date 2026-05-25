import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TeamMemberResponseDto {
  @ApiProperty({ description: 'ID único do membro', example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ description: 'Nome do membro', example: 'Pedro Santos' })
  name!: string;

  @ApiProperty({ description: 'Cargo/função', example: 'Eletricista' })
  jobTitle!: string;

  @ApiProperty({ description: 'Email', example: 'pedro@exemplo.com' })
  email!: string;

  @ApiPropertyOptional({ description: 'Telefone', example: '(11) 97777-6666' })
  phone?: string;

  @ApiProperty({ description: 'Status do membro', example: 'active' })
  status!: string;

  @ApiProperty({ description: 'Data de criação do registro' })
  createdAt!: Date;

  @ApiProperty({ description: 'Data da última atualização' })
  updatedAt!: Date;

  @ApiPropertyOptional({ description: 'Orçamentos associados ao membro' })
  teamOrders!: any[];
}
