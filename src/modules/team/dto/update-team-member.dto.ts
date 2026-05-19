import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateTeamMemberDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  jobTitle!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9()+\-\s]+$/, {
    message: 'phone must contain only numbers, spaces or common phone symbols',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  status!: string;
}
