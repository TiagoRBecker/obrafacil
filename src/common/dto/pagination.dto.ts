import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParams {
  @ApiPropertyOptional({ description: 'Número da página', default: 1, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ description: 'Itens por página (máx. 100)', default: 10, example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}

export class PaginatedResponse<T> {
  data!: T[];

  @ApiProperty({ description: 'Total de registros', example: 50 })
  total!: number;

  @ApiProperty({ description: 'Página atual', example: 1 })
  page!: number;

  @ApiProperty({ description: 'Itens por página', example: 10 })
  limit!: number;

  @ApiProperty({ description: 'Total de páginas', example: 5 })
  totalPages!: number;
}
