import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { SettingsIdParamDto } from '../dto/settings-id-param.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpdateSettingsUseCase } from '../usecase/update-settings.usecase';

@Controller('admin/settings')
@UseGuards(AdminTokenGuard)
export class UpdateSettingsController {
  constructor(private readonly updateSettingsUseCase: UpdateSettingsUseCase) {}

  @Patch('update/:id')
  update(
    @Param() params: SettingsIdParamDto,
    @Body() body: UpsertSettingsDto,
  ): Promise<SettingsResponseDto> {
    return this.updateSettingsUseCase.execute(params.id, body);
  }
}
