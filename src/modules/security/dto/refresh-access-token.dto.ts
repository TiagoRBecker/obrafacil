import { IsOptional, IsString } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsString()
  refreshToken!: string;

  @IsOptional()
  @IsString()
  refreshSecret?: string;

  @IsOptional()
  @IsString()
  accessSecret?: string;

  @IsOptional()
  @IsString()
  accessExpiresIn?: string;
}
