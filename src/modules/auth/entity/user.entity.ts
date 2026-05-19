export interface UserEntityProps {
  id?: string;
  name: string;
  email: string;
  role: string;
  passwordHash: string;
  permission?: string[];
  settingsId?: string | null;
  settings?: {
    id: string | undefined;
    name: string | undefined;
    logoUrl: string | undefined;
    specialty: string | undefined;
  };
}

export class UserEntity {
  private constructor(private readonly props: UserEntityProps) {}

  static create(props: Omit<UserEntityProps, 'id' | 'createdAt'>): UserEntity {
    return new UserEntity({
      ...props,
      email: props.email?.toLowerCase(),
    });
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get role(): string {
    return this.props.role;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }
  get permission(): string[] {
    return this.props.permission as string[];
  }
  get settingsId(): string | null {
    return this.props.settingsId as string;
  }
  get settingsName(): string | undefined {
    return this.props.settings?.name ;
  }
  get settingslogoUrl(): string | undefined {
    return this.props.settings?.logoUrl ;
  }
  get settingsspecialty(): string | undefined {
    return this.props.settings?.specialty;
  }
  get settingsID(): string | undefined {
    return this.props.settings?.id ;
  }

  static toDto(props: UserEntityProps): UserEntity {
    return new UserEntity({ ...props, id: props.id });
  }
}
