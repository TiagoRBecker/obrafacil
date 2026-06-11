import { UpsertSettingsController } from './upsert.settings.controller';
import { FindByIdSettingsController } from './findById.settings.controller';
import { CreateSettingsController } from './create.settings.controller';

export const SettingsController = [
  CreateSettingsController,
   FindByIdSettingsController,
  UpsertSettingsController
 
];
