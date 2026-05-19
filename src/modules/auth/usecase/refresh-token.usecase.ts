import { Injectable } from '@nestjs/common';

import { AccessTokenResponseDto } from '../../security/dto/access-token-response.dto';
import { RefreshAccessTokenUseCase } from '../../security/usecase/refresh-access-token.usecase';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly refreshAccessTokenUseCase: RefreshAccessTokenUseCase,
  ) {}

  execute(input: RefreshTokenDto): AccessTokenResponseDto {
    return this.refreshAccessTokenUseCase.execute({
      refreshToken: input.refreshToken,
    });
  }
}
