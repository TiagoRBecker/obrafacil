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
    get settingsId(): string | null;
    get settingsName(): string | undefined;
    get settingslogoUrl(): string | undefined;
    get settingsspecialty(): string | undefined;
    get settingsID(): string | undefined;
    static toDto(props: UserEntityProps): UserEntity;
}
