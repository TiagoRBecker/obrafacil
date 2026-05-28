import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccessTokenResponseDto } from '../dto/access-token-response.dto';
import { GenerateAccessTokenDto } from '../dto/generate-access-token.dto';

interface AccessTokenPayload {
  id: string;
  name: string;
  role: string;
  permission?: string[];
  settingsId: string | undefined;
}

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  execute(input: GenerateAccessTokenDto): AccessTokenResponseDto {
    const payload: AccessTokenPayload = {
      id: input.id,
      name: input.name,
      role: input.role,
      permission: input.permission,
      settingsId: input.settingsId,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
