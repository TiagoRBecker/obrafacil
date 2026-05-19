"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEntity = void 0;
class CustomerEntity {
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new CustomerEntity({
            ...props,
            name: props.name.trim(),
            phone: props.phone.trim(),
            address: props.address?.trim(),
        });
    }
    static toDTO(props) {
        return new CustomerEntity({
            id: props?.id,
            name: props.name,
            address: props.address,
            phone: props.phone,
            service: props.service,
            city: props.city,
        });
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get phone() {
        return this.props.phone;
    }
    get address() {
        return this.props.address;
    }
    get service() {
        return this.props.service;
    }
    get city() {
        return this.props.city;
    }
    toJSON() {
        return {
            ...this.props,
        };
    }
}
exports.CustomerEntity = CustomerEntity;
//# sourceMappingURL=customer.entity.js.map