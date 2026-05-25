import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponseDto {
  @ApiProperty({ description: 'Novo token de acesso JWT', example: 'eyJhbGciOiJIUzI1NiIs...' })
  accessToken!: string;
}
