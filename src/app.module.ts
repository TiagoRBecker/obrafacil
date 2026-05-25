import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
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
import { UserModule } from './modules/Users/user.module';
import { SharedModule } from './modules/Shared/shared.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
