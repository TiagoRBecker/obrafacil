export interface TeamMemberEntityProps {
  readonly id?: string;
  readonly name: string;
  readonly jobTitle: string;
  readonly email: string;
  readonly phone?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly status?:string
  readonly teamsOrder?:any[]
}

export class TeamMemberEntity {
  private constructor( private readonly props: TeamMemberEntityProps) {
    Object.assign(this, props);
  }

  static create(props: TeamMemberEntityProps): TeamMemberEntity {
    return new TeamMemberEntity({
      ...props
    });
  }
  static toDTO(props: TeamMemberEntityProps): TeamMemberEntity {
    return new TeamMemberEntity({
      ...props,
    });
  }
   get data(): TeamMemberEntityProps {
    return this.props
  }
}
