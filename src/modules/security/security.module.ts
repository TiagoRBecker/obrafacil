import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import securityConfig from './security.config';
import { CompareHashUseCase } from './usecase/compare-hash.usecase';
import { GenerateAccessTokenUseCase } from './usecase/generate-access-token.usecase';
import { GenerateHashUseCase } from './usecase/generate-hash.usecase';
import { GenerateRefreshTokenUseCase } from './usecase/generate-refresh-token.usecase';
import { RefreshAccessTokenUseCase } from './usecase/refresh-access-token.usecase';

@Module({
  imports: [
    ConfigModule.forFeature(securityConfig),
  ],
  providers: [
    GenerateHashUseCase,
    CompareHashUseCase,
    GenerateAccessTokenUseCase,
    GenerateRefreshTokenUseCase,
    RefreshAccessTokenUseCase,
  ],
  exports: [
    GenerateHashUseCase,
    CompareHashUseCase,
    GenerateAccessTokenUseCase,
    GenerateRefreshTokenUseCase,
    RefreshAccessTokenUseCase,
  ],
})
export class SecurityModule {}
