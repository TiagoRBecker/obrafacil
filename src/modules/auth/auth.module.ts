import { Global, Module } from '@nestjs/common';

import { SecurityModule } from '../security/security.module';
import { AuthController } from './auth.controller';
import { InMemoryUserRepository } from './repo/in-memory-user.repository';
import { UserRepositoryInterface } from './repo/user.repository.interface';
import { RefreshTokenUseCase } from './usecase/refresh-token.usecase';
import { SignInUseCase } from './usecase/sign-in.usecase';
import { SignUpUseCase } from './usecase/sign-up.usecase';
import { UserRepo } from './repo/user.repo';
import { PrismaService } from '../../db/prisma';
import { AdminTokenGuard } from '../../guards/admin-token.guard';
@Global()
@Module({
  imports: [SecurityModule],
  controllers: [AuthController],
  providers: [
     {
      provide: UserRepositoryInterface,
      useClass: UserRepo,
    },
    PrismaService,
    SignUpUseCase,
    SignInUseCase,
    RefreshTokenUseCase,
    InMemoryUserRepository,
   
   
  ],
  exports:[UserRepositoryInterface]
})
export class AuthModule {}
