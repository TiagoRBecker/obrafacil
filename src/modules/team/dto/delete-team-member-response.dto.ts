import { ApiProperty } from '@nestjs/swagger';

export class DeleteTeamMemberResponseDto {
  @ApiProperty({ description: 'ID do membro excluído', example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ description: 'Indica se a exclusão foi realizada com sucesso', example: true })
  deleted!: boolean;
}
