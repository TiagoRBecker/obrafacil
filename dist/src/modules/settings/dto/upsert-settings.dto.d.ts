export declare enum DefaultBillingUnit {
    HOUR = "hour",
    DAY = "day",
    FIXED_SERVICE = "fixed_service"
}
export declare class UpsertSettingsDto {
    id: string;
    name: string;
    specialty: string;
    phone: string;
    email: string;
    address?: string;
    logoUrl?: string;
}
