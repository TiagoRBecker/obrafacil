import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamMemberDto {
  @ApiProperty({ description: 'Nome do membro da equipe', example: 'Pedro Santos' })
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({ description: 'Cargo/função do membro', example: 'Eletricista' })
  @IsString()
  @MinLength(2)
  jobTitle!: string;

  @ApiProperty({ description: 'Email do membro', example: 'pedro@exemplo.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ description: 'Telefone do membro', example: '(11) 97777-6666' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9()+\-\s]+$/, {
    message: 'phone must contain only numbers, spaces or common phone symbols',
  })
  phone!: string;
}
