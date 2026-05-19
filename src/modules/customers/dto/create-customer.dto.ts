import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
export enum ServiceTypeEnum {
  ELECTRICAL = 'electrical',
  RENOVATION = 'renovation',
  PAINTING = 'painting',
  INSTALLATION = 'installation',
  MASONRY = 'masonry',
  PLUMBING = 'plumbing',
  FINISHING = 'finishing',
}
export class CreateCustomerDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @Matches(/^[0-9()+\-\s]+$/, {
    message: 'phone must contain only numbers, spaces or common phone symbols',
  })
  phone!: string;
  @IsEnum(ServiceTypeEnum, {
    message: 'Tipo de serviço invalido ! Consulte  documentaçao para enviar o valor certo',
  })
  service!: ServiceTypeEnum;

  @IsOptional()
  @IsString()
  address?: string;
  @IsOptional()
  @IsString()
  city?: string;
}
