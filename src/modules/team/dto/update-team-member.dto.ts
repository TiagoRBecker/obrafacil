import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeamMemberDto {
  @ApiPropertyOptional({ description: 'Nome do membro', example: 'Pedro Santos' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({ description: 'Cargo/função', example: 'Eletricista Sênior' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  jobTitle!: string;

  @ApiPropertyOptional({ description: 'Email', example: 'pedro@exemplo.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Telefone', example: '(11) 97777-6666' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9()+\-\s]+$/, {
    message: 'phone must contain only numbers, spaces or common phone symbols',
  })
  phone?: string;

  @ApiPropertyOptional({ description: 'Status do membro', example: 'active' })
  @IsOptional()
  @IsString()
  status!: string;
}
