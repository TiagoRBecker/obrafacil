import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'Token de acesso JWT para autenticação nos endpoints protegidos', example: 'eyJhbGciOiJIUzI1NiIs...' })
  accessToken?: string;

  @ApiProperty({ description: 'Refresh token para renovar o access token quando expirar', example: 'eyJhbGciOiJIUzI1NiIs...' })
  refreshToken?: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado',
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'João Silva',
      email: 'joao@exemplo.com',
      role: 'ADMIN',
      permission: ['order:create', 'order:read'],
      companyName: 'Minha Empresa',
      logoUrl: 'https://exemplo.com/logo.png',
      specialty: 'Elétrica',
    },
  })
  user!: {
    id: string;
    name: string;
    email: string;
    role: string;
    permission?: string[];
    companyName?: string;
    logoUrl?: string;
    specialty?: string;
  };
}

