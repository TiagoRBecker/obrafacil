import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsResponseDto } from '../dto/settings-response.dto';
import { CreateSettingsUseCase } from '../usecase/create-settings.usecase';
import { RequirePermissions } from '../../../../decorators';

@Controller('admin/settings')
@UseGuards(AdminTokenGuard)
export class CreateSettingsController {
  constructor(private readonly createSettingsUseCase: CreateSettingsUseCase) {}

  @RequirePermissions('order:create')
  @Post('create')
  create(
    @Req() req,
    @Body() body: UpsertSettingsDto,
  ): Promise<SettingsResponseDto> {
    const userId = req.user;
    return this.createSettingsUseCase.execute(body, userId);
  }
}
