import { Module } from '@nestjs/common';
import { WhatsAppController } from './controllers';
import { EvoModule } from '../evo/evo.module';
import { BudgetsModule } from '../budgets/budgets.module';
import { UserModule } from '../users/user.module';
import { WebhookGuard } from '../../guards/webhook.guard';
import { WebHookUseCase } from './usecase/webhook.usecase';
import { CreateConnectionUseCase } from './usecase/create-connection-instance.usecase';
import { EventDispatcherService } from './usecase/event-dispatcher.usecase';
import { UpdateStatusConnectionUseCase } from './usecase/update-status-connection-usecase';
import { WhatsAppRepositoryInterface } from './repo/whatsapp-repo-interface';
import { WhatsAppRepo } from './repo/whatsapp-repo';
import { PrismaService } from '../../db/prisma';
import { GetConnectionUseCase } from './usecase/findByConnection-usecase';
import { SendMessageUseCase } from './usecase/send-message.usecase';

@Module({
  controllers: [...WhatsAppController],
  imports: [EvoModule, BudgetsModule, UserModule],
  providers: [
    PrismaService,
    CreateConnectionUseCase,
    WebHookUseCase,
    EventDispatcherService,
    UpdateStatusConnectionUseCase,
    GetConnectionUseCase,
    WebhookGuard,
    SendMessageUseCase,
    {
      provide: WhatsAppRepositoryInterface,
      useClass: WhatsAppRepo,
    },
  ],
})
export class WhatsAppModule {}
