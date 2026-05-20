export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class SignUpDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
