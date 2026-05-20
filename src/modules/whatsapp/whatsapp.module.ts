import { Module } from '@nestjs/common';
import {
  ConnectionController,
  MessageController,
  Webhook,
} from './controllers/connection.controller';
import { EvoModule } from '../evo/evo.module';
import { ConnectionUSeCase } from './usecase/connection.service';
import { WebHookUseCase } from './usecase/update.status.webhook.service';
import { BudgetsModule } from '../budgets/budgets.module';
import { UserModule } from '../Users/user.module';

@Module({
  controllers: [ConnectionController, MessageController, Webhook],
  imports: [EvoModule,BudgetsModule,UserModule],
  providers: [ConnectionUSeCase,WebHookUseCase],
})
export class WhatsAppModule {}
