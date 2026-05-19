import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SecurityModule } from './modules/security/security.module';
import { SettingsModule } from './modules/settings/settings.module';
import { TeamModule } from './modules/team/team.module';
import { APP_GUARD } from '@nestjs/core';
import { AdminTokenGuard } from './guards/admin-token.guard';

import { WhatsAppModule } from './modules/whatsapp/whatsapp.module';
import { EvoModule } from './modules/evo/evo.module';
import { MessageModule } from './modules/message/message.module';


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
    MessageModule
  ],
  controllers: [AppController],
   providers: [
    AppService,
   
  ],

})
export class AppModule {}
