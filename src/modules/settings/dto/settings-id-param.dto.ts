import { IsString, MinLength } from 'class-validator';

export class SettingsIdParamDto {
  @IsString()
  @MinLength(1)
  id!: string;
}
