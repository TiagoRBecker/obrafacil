import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';


export class CreateTeamMemberDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @MinLength(2)
  jobTitle!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9()+\-\s]+$/, {
    message: 'phone must contain only numbers, spaces or common phone symbols',
  })
  phone!: string;

  
}
