export interface CustomerEntityProps {
    id?: string;
    name: string;
    phone: string;
    address: string;
    service: string;
    city: string;
}
export interface CustomerWithOrders {
    customer: CustomerEntity;
    orders: any[];
}
export declare class CustomerEntity {
    private readonly props;
    private constructor();
    static create(props: Omit<CustomerEntityProps, 'id'>): CustomerEntity;
    static toDTO(props: CustomerEntityProps): CustomerEntity;
    get id(): string | undefined;
    get name(): string;
    get phone(): string;
    get address(): string | undefined;
    get service(): string;
    get city(): string | undefined;
    toJSON(): CustomerEntityProps;
}
