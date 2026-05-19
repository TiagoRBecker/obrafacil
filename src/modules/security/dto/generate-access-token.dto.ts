import { Transform } from 'class-transformer';
import { IsArray, isArray, IsIn, IsOptional, IsString } from 'class-validator';

export class GenerateAccessTokenDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsIn(['admin', 'member', 'viewer'])
  role!: string;

  @IsOptional()
  @IsString()
  secret?: string;

  @IsOptional()
  @IsString()
  expiresIn?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permission?: string[];
  @IsOptional()
  @Transform(({ value }) => value ?? undefined)
  settingsId?: string;
}
