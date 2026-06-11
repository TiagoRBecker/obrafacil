import { ApiProperty } from '@nestjs/swagger';

class MonthlyConversionDto {
  @ApiProperty({ description: 'Mês no formato YYYY-MM' })
  month!: string;

  @ApiProperty({ description: 'Total de orçamentos enviados no mês' })
  sent!: number;

  @ApiProperty({ description: 'Total de orçamentos aprovados no mês' })
  approved!: number;
}

class RecentOrderDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  clientName!: string;

  @ApiProperty()
  totalValue!: number;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  createdAt!: Date;
}

export class MetricsResponseDto {
  @ApiProperty({ description: 'Total de clientes cadastrados' })
  totalCustomers!: number;

  @ApiProperty({ description: 'Total de orçamentos criados' })
  totalOrders!: number;

  @ApiProperty({ description: 'Total de membros da equipe' })
  totalTeamMembers!: number;

  @ApiProperty({ description: 'Valor total dos orçamentos aprovados' })
  approvedRevenue!: number;

  @ApiProperty({ description: 'Conversão mensal', type: [MonthlyConversionDto] })
  monthlyConversion!: MonthlyConversionDto[];

  @ApiProperty({ description: 'Últimos 6 orçamentos', type: [RecentOrderDto] })
  recentOrders!: RecentOrderDto[];
}
