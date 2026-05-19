export interface CustomerEntityProps {
  id?: string;
  name: string;
  phone: string;
  address: string;
  service: string;
  city: string;
}

export class CustomerEntity {
  private constructor(private readonly props: CustomerEntityProps) {}

  static create(props: Omit<CustomerEntityProps, 'id'>): CustomerEntity {
    return new CustomerEntity ({
      ...props,
      name: props.name.trim(),
      phone: props.phone.trim(),
      address: props.address?.trim(),
    });
  }
  static toDTO(props: CustomerEntityProps): CustomerEntity {
    return new CustomerEntity({
      id: props?.id as string,
      name: props.name,
      address: props.address,
      phone: props.phone,
      service: props.service,
      city: props.city,
    });
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get phone(): string {
    return this.props.phone;
  }

  get address(): string | undefined {
    return this.props.address;
  }
  get service(): string {
    return this.props.service;
  }
  get city(): string | undefined {
    return this.props.city;
  }

  toJSON(): CustomerEntityProps {
    return {
      ...this.props,
    };
  }
}
