import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

function NoSqlInjection(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'noSqlInjection',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return false;
          const sqlPattern = /('|--|;|\b(?:DROP|DELETE|INSERT|UPDATE|SELECT|ALTER|EXEC|UNION|CREATE|TRUNCATE)\b)/i;
          return !sqlPattern.test(value);
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} contém caracteres não permitidos`;
        },
      },
    });
  };
}

export class IdParamDto {
  @ApiProperty({ description: 'ID único', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @MinLength(1)
  @MaxLength(36)
  @Matches(/^[0-9a-zA-Z-]+$/, { message: 'O ID deve conter apenas letras, números e hífens' })
  @NoSqlInjection()
  id!: string;
}
