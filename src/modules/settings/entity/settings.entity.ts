

export interface SettingsEntityProps {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  address?: string;
  logoUrl?: string;

}

export class SettingsEntity {
  private constructor(private readonly props: SettingsEntityProps) {}

  static create(props: SettingsEntityProps): SettingsEntity {
    return new SettingsEntity({
      ...props,
      name: props.name,
      specialty: props.specialty,
      phone: props.phone,
      email: props.email,
      address: props.address,
      logoUrl: props.logoUrl
   
    });
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get specialty(): string {
    return this.props.specialty;
  }

  get phone(): string {
    return this.props.phone;
  }

  get email(): string {
    return this.props.email;
  }

  get address(): string | undefined {
    return this.props.address;
  }

  get logoUrl(): string | undefined {
    return this.props.logoUrl;
  }



  toJSON(): SettingsEntityProps {
    return {
      ...this.props,
    };
  }
}
