import { IsString, MinLength } from 'class-validator';

export class CustomerIdParamDto {
  @IsString()
  @MinLength(1)
  id!: string;
}
