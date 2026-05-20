export interface UserEntityProps {
    id?: string;
    name: string;
    email: string;
    role: string;
    passwordHash: string;
    permission?: string[];
}
export declare class UserEntity {
    private readonly props;
    private constructor();
    static create(props: Omit<UserEntityProps, 'id' | 'createdAt'>): UserEntity;
    get id(): string | undefined;
    get name(): string;
    get email(): string;
    get role(): string;
    get passwordHash(): string;
    get permission(): string[];
    static toDto(props: UserEntityProps): UserEntity;
}
