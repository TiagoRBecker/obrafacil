import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SecurityModule } from './modules/security/security.module';
import { SettingsModule } from './modules/settings/settings.module';
import { TeamModule } from './modules/team/team.module';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

import { WhatsAppModule } from './modules/whatsapp/whatsapp.module';
import { EvoModule } from './modules/evo/evo.module';
import { MessageModule } from './modules/message/message.module';
import { UserModule } from './modules/users/user.module';
import { SharedModule } from './modules/Shared/shared.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('security.jwtAccessSecret') ?? 'change-me-in-production',
        signOptions: {
          expiresIn: configService.get<string>('security.jwtAccessExpiresIn') ?? ('55m' as any),
        },
      }),
    }),
    AuthModule,
    BudgetsModule,
    TeamModule,
    CustomersModule,
    SettingsModule,
    SecurityModule,
    WhatsAppModule,
    EvoModule,
    MessageModule,
    UserModule,
    SharedModule
  ],
  controllers: [AppController],
   providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],

})
export class AppModule {}
