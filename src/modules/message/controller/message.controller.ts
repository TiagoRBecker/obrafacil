import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { RequirePermissions } from '../../../../decorators';
import { SendMessageUseCase } from '../usecase/sendMessage.service';

@Controller('admin/send')
@UseGuards(AdminTokenGuard)
export class SenMessageController {
  constructor(private readonly sendMessage: SendMessageUseCase) {}
  @RequirePermissions('order:create')
  @Post('/message')
  create(@Body() body: { id: string }) {
    return this.sendMessage.execute(body.id);
  }
}
