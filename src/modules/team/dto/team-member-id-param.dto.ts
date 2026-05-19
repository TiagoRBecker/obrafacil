import { IsString, MinLength } from 'class-validator';

export class TeamMemberIdParamDto {
  @IsString()
  @MinLength(1)
  id!: string;
}
