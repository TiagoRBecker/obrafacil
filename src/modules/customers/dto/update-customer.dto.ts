import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @Matches(/^[0-9()+\-\s]+$/, {
    message: 'phone must contain only numbers, spaces or common phone symbols',
  })
  phone!: string;

  @IsOptional()
  @IsString()
  address!: string;

  @IsOptional()
  @IsString()
  service!: string;

  @IsOptional()
  @IsString()
  city!: string;
}
