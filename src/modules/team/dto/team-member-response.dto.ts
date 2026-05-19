

export class TeamMemberResponseDto {
  id!: string;
  name!: string;
  jobTitle!: string;
  email!: string;
  phone?: string;
  status!: string;
  createdAt!: Date;
  updatedAt!: Date;
  teamOrders!:any[]
}
