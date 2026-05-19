import { Module } from '@nestjs/common';
import { SenMessageController } from './controller/message.controller';
import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { SendMessageUseCase } from './usecase/sendMessage.service';
import { BudgetsModule } from '../budgets/budgets.module';
import { EvoModule } from '../evo/evo.module';



@Module({
  controllers: [SenMessageController],
  imports: [BudgetsModule,EvoModule],
  providers: [SendMessageUseCase, AdminTokenGuard],
})
export class MessageModule {}
