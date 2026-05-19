import { IsIn, IsOptional, IsString } from 'class-validator';

export class GenerateRefreshTokenDto {
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
}
