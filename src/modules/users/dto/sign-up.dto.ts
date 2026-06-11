import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export class SignUpDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
  @IsNotEmpty()
  @IsEnum(UserRole, {
    message: 'Cargo precisa ser preenchido corretamente !',
  })
  role!: UserRole;
}