export class CustomerResponseDto {
  id!: string;
  name!: string;
  phone!: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  service!:string
  city!:string
}
