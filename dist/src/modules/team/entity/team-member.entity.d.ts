export interface TeamMemberEntityProps {
    readonly id?: string;
    readonly name: string;
    readonly jobTitle: string;
    readonly email: string;
    readonly phone?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly status?: string;
    readonly teamsOrder?: any[];
}
export declare class TeamMemberEntity {
    private readonly props;
    private constructor();
    static create(props: TeamMemberEntityProps): TeamMemberEntity;
    static toDTO(props: TeamMemberEntityProps): TeamMemberEntity;
    get data(): TeamMemberEntityProps;
}
