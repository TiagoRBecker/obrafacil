import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUrl, Matches, MinLength } from "class-validator";

export class CreateSettingsDto {
  

  @ApiProperty({ description: 'Nome da empresa', example: 'Minha Empresa de Serviços' })
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({ description: 'Especialidade da empresa', example: 'Elétrica e Hidráulica' })
  @IsString()
  @MinLength(2)
  specialty!: string;

  @ApiProperty({ description: 'Telefone da empresa', example: '(11) 3000-0000' })
  @IsString()
  @Matches(/^[0-9()+\-\s]+$/, {
    message: 'phone must contain only numbers, spaces or common phone symbols',
  })
  phone!: string;

  @ApiProperty({ description: 'Email da empresa', example: 'contato@minhaempresa.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ description: 'Endereço da empresa', example: 'Rua Augusta, 500' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'URL do logo da empresa', example: 'https://minhaempresa.com/logo.png' })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;
}
