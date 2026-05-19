export declare enum UserRole {
    ADMIN = "admin",
    USER = "user",
    SELLER = "seller"
}
export declare const resources: readonly ["account", "customer", "order", "team", "settings"];
export declare const actions: readonly ["create", "read", "update", "delete"];
type Resource = typeof resources[number];
type Action = typeof actions[number];
export type Permission = `${Resource}:${Action}`;
export {};
