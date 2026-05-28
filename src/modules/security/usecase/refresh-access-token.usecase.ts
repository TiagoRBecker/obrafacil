import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AccessTokenResponseDto } from '../dto/access-token-response.dto';
import { RefreshAccessTokenDto } from '../dto/refresh-access-token.dto';
import type { SecurityConfig } from '../security.config';

@Injectable()
export class RefreshAccessTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  execute(input: RefreshAccessTokenDto): AccessTokenResponseDto {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const refreshSecret =
      input.refreshSecret ?? securityConfig?.jwtRefreshSecret ?? 'change-me-in-production';
    const accessExpiresIn =
      input.accessExpiresIn ?? securityConfig?.jwtAccessExpiresIn ?? '15m';

    let payload: { id: string; name: string; role: string };

    try {
      payload = this.jwtService.verify<{ id: string; name: string; role: string }>(
        input.refreshToken,
        { secret: refreshSecret },
      );
    } catch {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    if (!payload?.id || !payload?.name || !payload?.role) {
      throw new UnauthorizedException('Invalid refresh token payload.');
    }

    const accessToken = this.jwtService.sign(
      {
        id: payload.id,
        name: payload.name,
        role: payload.role,
      },
      { expiresIn: accessExpiresIn as any },
    );

    return {
      accessToken,
    };
  }
}
