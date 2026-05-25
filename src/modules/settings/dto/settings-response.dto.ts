import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SettingsResponseDto {
  @ApiProperty({ description: 'ID único da configuração', example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ description: 'Nome da empresa', example: 'Minha Empresa de Serviços' })
  name!: string;

  @ApiProperty({ description: 'Especialidade da empresa', example: 'Elétrica e Hidráulica' })
  specialty!: string;

  @ApiPropertyOptional({ description: 'Telefone da empresa', example: '(11) 3000-0000' })
  phone?: string;

  @ApiPropertyOptional({ description: 'Email da empresa', example: 'contato@minhaempresa.com' })
  email?: string;

  @ApiPropertyOptional({ description: 'Endereço da empresa', example: 'Rua Augusta, 500' })
  address?: string;

  @ApiPropertyOptional({ description: 'URL do logo da empresa', example: 'https://minhaempresa.com/logo.png' })
  logoUrl?: string;
}
