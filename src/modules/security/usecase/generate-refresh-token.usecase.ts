import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { GenerateRefreshTokenDto } from '../dto/generate-refresh-token.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';
import type { SecurityConfig } from '../security.config';

interface RefreshTokenPayload {
  id: string;
  name: string;
  role: string;
}

@Injectable()
export class GenerateRefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  execute(input: GenerateRefreshTokenDto): RefreshTokenResponseDto {
    const payload: RefreshTokenPayload = {
      id: input.id,
      name: input.name,
      role: input.role,
    };

    const securityConfig = this.configService.get<SecurityConfig>('security');
    const secret =
      input.secret ?? securityConfig?.jwtRefreshSecret ?? 'change-me-in-production';
    const expiresIn =
      input.expiresIn ?? securityConfig?.jwtRefreshExpiresIn ?? '15d';

    const refreshToken = this.jwtService.sign(payload, {
      secret,
      expiresIn: expiresIn as any,
    });

    return {
      refreshToken,
    };
  }
}
