import { Module } from '@nestjs/common';
import { SendMessageController } from './controller/message.controller';
import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { SendMessageUseCase } from './usecase/send-message.usecase';
import { BudgetsModule } from '../budgets/budgets.module';
import { EvoModule } from '../evo/evo.module';
import { UserModule } from '../Users/user.module';



@Module({
  controllers: [SendMessageController],
  imports: [BudgetsModule,EvoModule,UserModule],
  providers: [SendMessageUseCase, AdminTokenGuard],
})
export class MessageModule {}
