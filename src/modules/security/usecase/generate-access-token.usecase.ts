import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

import { AccessTokenResponseDto } from '../dto/access-token-response.dto';
import { GenerateAccessTokenDto } from '../dto/generate-access-token.dto';
import type { SecurityConfig } from '../security.config';

interface AccessTokenPayload {
  id: string;
  name: string;
  role: string;
  permission?: string[];
  settingsId: string | undefined;
}

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(private readonly configService: ConfigService) {}

  execute(input: GenerateAccessTokenDto): AccessTokenResponseDto {
    const payload: AccessTokenPayload = {
      id: input.id,
      name: input.name,
      role: input.role,
      permission: input.permission,
      settingsId: input.settingsId,
    };

    const securityConfig = this.configService.get<SecurityConfig>('security');
    const secret =
      input.secret ?? securityConfig?.jwtAccessSecret ?? 'change-me-in-production';
    const expiresIn =
      input.expiresIn ?? securityConfig?.jwtAccessExpiresIn ?? '1d';

    const accessToken = jwt.sign(payload, secret, {
      expiresIn: expiresIn as SignOptions['expiresIn'],
    });

    return {
      accessToken,
    };
  }
}
