export interface SettingsEntityProps {
    id: string;
    name: string;
    specialty: string;
    phone: string;
    email: string;
    address?: string;
    logoUrl?: string;
}
export declare class SettingsEntity {
    private readonly props;
    private constructor();
    static create(props: SettingsEntityProps): SettingsEntity;
    get id(): string;
    get name(): string;
    get specialty(): string;
    get phone(): string;
    get email(): string;
    get address(): string | undefined;
    get logoUrl(): string | undefined;
    toJSON(): SettingsEntityProps;
}
