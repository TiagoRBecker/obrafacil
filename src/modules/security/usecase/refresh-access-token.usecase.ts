import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';

import { AccessTokenResponseDto } from '../dto/access-token-response.dto';
import { RefreshAccessTokenDto } from '../dto/refresh-access-token.dto';
import type { SecurityConfig } from '../security.config';

interface RefreshTokenPayload extends JwtPayload {
  id: string;
  name: string;
  role: string;
}

@Injectable()
export class RefreshAccessTokenUseCase {
  constructor(private readonly configService: ConfigService) {}

  execute(input: RefreshAccessTokenDto): AccessTokenResponseDto {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const refreshSecret =
      input.refreshSecret ?? securityConfig?.jwtRefreshSecret ?? 'change-me-in-production';
    const accessSecret =
      input.accessSecret ?? securityConfig?.jwtAccessSecret ?? 'change-me-in-production';
    const accessExpiresIn =
      input.accessExpiresIn ?? securityConfig?.jwtAccessExpiresIn ?? '15m';

    let payload: RefreshTokenPayload;

    try {
      payload = jwt.verify(input.refreshToken, refreshSecret) as RefreshTokenPayload;
    } catch {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    if (!payload?.id || !payload?.name || !payload?.role) {
      throw new UnauthorizedException('Invalid refresh token payload.');
    }

    const accessToken = jwt.sign(
      {
        id: payload.id,
        name: payload.name,
        role: payload.role,
      },
      accessSecret,
      {
        expiresIn: accessExpiresIn as SignOptions['expiresIn'],
      },
    );

    return {
      accessToken,
    };
  }
}
