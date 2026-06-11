import { Global, Module } from '@nestjs/common';

import { SecurityModule } from '../security/security.module';

import { RefreshTokenUseCase } from './usecase/refresh-token.usecase';
import { SignInUseCase } from './usecase/sign-in.usecase';
import { SignUpUseCase } from './usecase/sign-up.usecase';
import { PrismaService } from '../../db/prisma';
import { UserModule } from '../users/user.module';
import { AuthController } from './controllers';
import { SettingsModule } from '../settings/settings.module';

@Global()
@Module({
  imports: [SecurityModule,UserModule,SettingsModule],
  controllers: [...AuthController],
  providers: [
    PrismaService,
    SignUpUseCase,
    SignInUseCase,
    RefreshTokenUseCase,
  

   
  ],
 
})
export class AuthModule {}
