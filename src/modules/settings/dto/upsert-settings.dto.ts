import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum DefaultBillingUnit {
  HOUR = 'hour',
  DAY = 'day',
  FIXED_SERVICE = 'fixed_service',
}

export class UpsertSettingsDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @MinLength(2)
  specialty!: string;

  @IsString()
  @Matches(/^[0-9()+\-\s]+$/, {
    message: 'phone must contain only numbers, spaces or common phone symbols',
  })
  phone!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsUrl()
  logoUrl?: string;
}
