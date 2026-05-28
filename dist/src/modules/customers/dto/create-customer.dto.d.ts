export declare enum ServiceTypeEnum {
    ELECTRICAL = "electrical",
    RENOVATION = "renovation",
    PAINTING = "painting",
    INSTALLATION = "installation",
    MASONRY = "masonry",
    PLUMBING = "plumbing",
    FINISHING = "finishing"
}
export declare class CreateCustomerDto {
    name: string;
    phone: string;
    service: ServiceTypeEnum;
    address?: string;
    city?: string;
}
