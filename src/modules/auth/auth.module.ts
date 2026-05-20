import { Global, Module } from '@nestjs/common';

import { SecurityModule } from '../security/security.module';
import { AuthController } from './auth.controller';
import { RefreshTokenUseCase } from './usecase/refresh-token.usecase';
import { SignInUseCase } from './usecase/sign-in.usecase';
import { SignUpUseCase } from './usecase/sign-up.usecase';
import { PrismaService } from '../../db/prisma';
import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { UserModule } from '../Users/user.module';

@Global()
@Module({
  imports: [SecurityModule,UserModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    SignUpUseCase,
    SignInUseCase,
    RefreshTokenUseCase,
  

   
  ],
 
})
export class AuthModule {}
